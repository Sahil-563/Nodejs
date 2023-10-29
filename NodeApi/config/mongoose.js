//Including the library
import mongoose from "mongoose";
//Connecting to a port using mongoose
mongoose.connect('mongodb://127.0.0.1:27017');
//Establishing a successful connection with mongoose
const db = mongoose.connection;
//Printing error if there is any
db.on('error',console.error.bind(console,'error connecting to db'));
//prnting connected successfully
db.once('open',function(){
    console.log('connected to database')
});