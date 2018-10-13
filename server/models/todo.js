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
