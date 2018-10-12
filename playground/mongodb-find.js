// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, client) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");

    const db = client.db('TodoApp');

    // db.collection('Todos').find({_id: new ObjectID('5bc1216a292cc75e50ae82c5')}).toArray().then( 
    //     (docs) => { 
    //         console.log("Todos", JSON.stringify(docs, undefined, 2));
    //     }, (err) => {
    //         console.log("Unable to fetch todos", err);
    //     }
    // )

    // db.collection('Todos').find().count().then( 
    //     (count) => { 
    //         console.log(`Todos count: ${JSON.stringify(count, undefined, 2)}`);
    //     }, (err) => {
    //         console.log("Unable to fetch todos", err);
    //     }
    // )

    db.collection('Users').find().count().then( 
        (count) => { 
            console.log(`Users count: ${JSON.stringify(count, undefined, 2)}`);
        }, (err) => {
            console.log("Unable to fetch todos", err);
        }
    )
    db.collection('Users').find({name: "Alberto"}).toArray().then( 
        (user) => { 
            console.log(`User: ${JSON.stringify(user, undefined, 2)}`);
        }, (err) => {
            console.log("Unable to fetch todos", err);
        }
    )
})