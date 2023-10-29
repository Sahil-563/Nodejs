import {User} from '../models/userSchema.js'
export const getAllUsers=async (req, res) => {
    const all_users = await User.find({});
    res.json({
        success: true,
        all_users,
    })
}

export const newUserRegister = async (req, res) => {
    const{name,email,password} = req.body;
    await User.create({
       name: name,
       email: email,
       password: password,

    })
    res.status(201).cookie('temp','lol').json({
        success: true,
        message:'Registered successfully'
    })
}

export const getUserId = async (req,res) => {
    console.log(req.query);
    const id = req.query.id
    res.json({
        success: true,
        message: `User Exist With ID ${id}`,
    })
}
export const putUser = async (req,res) => {
    console.log(req.query);
    const id = req.query.id
    res.json({
        success: true,
        message: `User put With ID ${id}`,
    })
}
export const deleteUser = async (req,res) => {
    
    const id = req.query.id
    res.json({
        success: true,
        message: `User deleted With ID ${id}`,
    })
}