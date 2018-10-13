//BASIC SETUP
//load mongoose module & connect to db
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

//MODELS
var Todo = mongoose.model("Todo", {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }, 
    completedAt: {
        type: Number,
        default: null
    }
})

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

// INSTANTIATE
var newUser = new User({
    email: 'acarrerasc@gmail.com'
})

newUser.save().then(
    (doc) => {console.log(JSON.stringify(doc, undefined, 2))},
    (err) => {console.log(err)}
)


// var newTodo = new Todo({
//                 text: "   Edit this video   ",
//             })

// newTodo.save().then( 
//     (doc) => {
//         console.log('Save todo', doc)
//     }, 
//     (err) => {
//         console.log('Unable to save todo', err)
//     }
// );


// newTodo.save().then( (doc) => {
//     console.log('Document was saved', JSON.stringify(doc, undefined, 2))
// }, (err) => {
//     console.log('Document was not saved', err)
// })
