// Loaded modules
const expect = require('expect'); //https://github.com/mjackson/expect
const request = require('supertest'); //https://github.com/visionmedia/supertest
const {ObjectID} = require('mongodb');

// Server
const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')


//testing lifecycle method
const todos = [{
    text: "First test to do",
    _id: new ObjectID()
}, {
    text: "Second test to do",
    _id: new ObjectID()
}];

const users = [{
    email: "acc@gmail.com",
    _id: new ObjectID()
}, {
    email: "aln@gmail.com",
    _id: new ObjectID()
}];


beforeEach( (done) => {
    Todo
        .remove({})
        .then( () => {
            return Todo.insertMany(todos)
        })
        .then( () => done() );
});

beforeEach( (done) => {
    User
        .remove({})
        .then( () => {
            return User.insertMany(users)
        })
        .then( () => done() );
});

//mocha
describe("POST /todos", () => {
    //mocha
    it('should create a new todo', (done) => {
        
        var text = 'Todo test';
        
        //supertest 
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect( (res) => {
                //expect 
                expect(res.body.text).toBe(text); 
            })
            .end( (err, res) => {
                if (err) {
                    return done(err);
                }
                
                Todo
                .find({text})
                .then( (todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                })
                .catch((e) => done(e));
            });
    });

    it('should not create todo with invalid data', (done) => {
        //supertest
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end( (err, res) => {
                if (err) {
                    return done(err);
                }

                //Mongoose query
                Todo
                .find()
                .then( 
                    (todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    }
                )
                .catch( (e) => done(e));
            });
    });

});

describe("GET /todos", () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect( (res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    } )

    describe("GET /todos/:id", () => {
        it('should return todo document', (done) => {
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect( (res) => {
                    expect(res.body.text).toBe(todos[0].text);
                })
                .end(done);
        });

        it('should return 404 Invalid ID', (done) => {
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}11`)
                .expect(404)
                .expect( (res) => {
                    expect(res.text).toBe("Invalid ID")
                })

                .end(done);
        });

        it('should return 404 No todo was found', (done) => {
            request(app)
                .get(`/todos/${new ObjectID()}`)
                .expect(404)
                .expect( (res) => {
                    expect(res.text).toBe("No todo was found")
                })
                .end(done);
        });
    });
});

describe("GET /users", () => {
    // it('should get all users', (done) => {
    //     request(app)
    //         .get('/users')
    //         .expect(200)
    //         .expect( (res) => {
    //             expect(res.body.users.length).toBe(2);
    //         })
    //         .end(done);
    // } )

    describe("GET /users/:id", () => {

        it('should return user document', (done) => {
            request(app)
            .get(`/users/${users[0]._id.toHexString()}`)
            .expect(200)
            .expect( (res) => {
                expect(res.body.email).toBe(users[0].email)
            })
            .end(done);
        })

        it('should return 404 Invalid ID', (done) => {
            request(app)
                .get(`/users/${todos[0]._id.toHexString()}11`)
                .expect(404)
                .expect( (res) => {
                    expect(res.text).toBe("Invalid ID")
                })

                .end(done);
        });

        it('should return 404 No todo was found', (done) => {
            request(app)
                .get(`/users/${new ObjectID()}`)
                .expect(404)
                .expect( (res) => {
                    expect(res.text).toBe("No user was found")
                })
                .end(done);
        });

    });
});

