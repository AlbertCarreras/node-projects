// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, client) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");

    const db = client.db('TodoApp');

    db.collection('Users').findOneAndUpdate(
        {_id: new ObjectID("5bc1192fde964e777a10cc87")}, 
        {   $set: { 
                name: "Alberto"
            }, 
            $inc: {
                age: 10
            }
    }, //update operator
        { returnOriginal: false}
    ).then( 
        (result) => { 
            console.log(result);
        }, (err) => {
            console.log("Unable to delete todos", err);
        }
    )


    
})