// Loaded modules
var express = require('express')
var bodyParser = require('body-parser')

// Imports
var {mongoose} = require('./db/mongoose')
var {User} = require('./models/user')
var {Todo} = require('./models/todo')
const {ObjectID} = require('mongodb');

// Set up server
var app = express();

//middleware
app.use(bodyParser.json());

//Routes
app.get('/todos', (req, res) => {
    Todo.find().then( (todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
})

app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        User
            .findById(id)
            .then( (user) => {
                user 
                    ? res.send(user)
                    : res.status(404).send("No user was found")
            })
            .catch( () => res.status(400).send("Couldn't process request"))
    }
    else {
        res.status(404).send("Invalid ID")
    }
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        Todo
            .findById(id)
            .then( (todo) => {
                user 
                    ? res.send(todo)
                    : res.status(404).send("No user was found")
            })
            .catch( () => res.status(400).send("Couldn't process request"))
    }
    else {
        res.status(404).send("Invalid ID")
    }
})


app.post('/todos', (req, res) => {
    var todo = new Todo( {
        text: req.body.text
    })
    todo.save().then((doc)=> {
        res.send(doc);

    }, (err)=> res.status(400).send(err))
})

app.listen(3000, () => {
    console.log("Started on port 3000");
});

module.exports = {app};