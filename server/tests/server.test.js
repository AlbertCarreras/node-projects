// Loaded modules
const expect = require('expect'); //https://github.com/mjackson/expect
const request = require('supertest'); //https://github.com/visionmedia/supertest

// Server
const {app} = require('./../server')
const {Todo} = require('./../models/todo')


//testing lifecycle method
beforeEach( (done) => {
    Todo.remove({}).then( () => done());
})

//mocha
describe(" POST /todos", () => {
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
                .find()
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
                Todo
                .find()
                .then( 
                    (todos) => {
                        expect(todos.length).toBe(0);
                        done();
                    }
                )
                .catch( (e) => done(e));
            });
    });

});