var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

// INSTANTIATE
// var newUser = new User({
//     email: 'acarrerasc@gmail.com'
// })

// newUser.save().then(
//     (doc) => {console.log(JSON.stringify(doc, undefined, 2))},
//     (err) => {console.log(err)}
// )
