const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1/cloudbook'
const dmongoURI = 'mongodb://localhost:27017'


const connectToMongo = () =>{
    mongoose.connect(dmongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoose Successfully");
}

module.exports = connectToMongo;