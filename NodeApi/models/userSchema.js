//Creating a schema for users email id and name
// This is the schema
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type: 'String',
        required: true,
    },
    email:{
        type: 'String',
        required: true,
    },
    password:{
        type: 'String',
        required: true,
    }
})
export const User = mongoose.model('User', userSchema);
