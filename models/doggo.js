let client = require('../dbConnection');

let collection = client.db().collection('doggos');

function postDoggo(dog, callback) {
    collection.insertOne(dog,callback);
}

function getAllDoggos(callback) {
    collection.find({}).toArray(callback);
}

module.exports = {postDoggo,getAllDoggos}