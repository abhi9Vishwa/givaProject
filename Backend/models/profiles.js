
var mongoose = require('mongoose');
//Set up default mongoose connection
var uri = 'mongodb://12:27017/my_database';
var mongoDB = 'mongodb+srv://admin:admin1@cluster0.kxeypj0.mongodb.net/?retryWrites=true&w=majority';
const connectToMongo = () => {
    mongoose.connect(mongoDB, { useNewUrlParser: true }, () => {
        console.log('Connected to MongoDB');
    });

}


// Compile model from schema
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = connectToMongo;