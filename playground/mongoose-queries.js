const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');
const {User} =  require('./../server/models/user');

var idTodo = '5bc25183206c10271ec15fc0';
var idUser = '5bc151eec81abb793a0ff4cb';

// if (!ObjectID.isValid(idTodo)) {
//     return console.log("ID is not valid");
// }
if (!ObjectID.isValid(idUser)) {
    return console.log("ID is not valid");
}

User
    .findById(idUser)
    .then( (user) => {
        user
            ? console.log("User", user)
            : console.log("User not found");
    } )
    .catch( (e) => console.log("Error", e))


// Todo
//     .find({
//         _id: id
//     })
//     .then( (todos) => console.log("Todos", todos));

// Todo
//     .findOne({
//         _id: id
//     })
//     .then( (todo) => console.log("Todo", todo));

// Todo
//     .findById(c)
//     .then( (todo) => 
//         !todo 
//             ? console.log('Id not found')
//             : console.log("Todo by id", todo)
//     )
//     .catch( (e) => console.log(e))

