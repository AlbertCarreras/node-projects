// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, client) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");

    const db = client.db('TodoApp');

    //deleteMany
    // db.collection('Todos').deleteMany({text: "eat food"}).then( 
    //     (result) => { 
    //         console.log(result);
    //     }, (err) => {
    //         console.log("Unable to delete todos", err);
    //     }
    // )

    //deleteOne
    // db.collection('Todos').deleteOne({text: "Something to do"}).then( 
    //     (result) => { 
    //         console.log(result);
    //     }, (err) => {
    //         console.log("Unable to delete todos", err);
    //     }
    // )

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text: "Something to do"}).then( 
    //     (result) => { 
    //         console.log(result);
    //     }, (err) => {
    //         console.log("Unable to delete todos", err);
    //     }
    // )

    // db.collection('Users').deleteMany({name: "Alberto"}).then( (res) => {
    //     console.log(res)  
    // }, (err) => {
    //     console.log(err)  
    // })

    db.collection('Users').findOneAndDelete({_id: new ObjectID("5bc1126f31e113beb9887755")}).then( (res) => {
        console.log(JSON.stringify(res, undefined, 2))  
    }, (err) => {
        console.log(err)  
    })

    
})