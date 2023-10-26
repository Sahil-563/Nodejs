const express=require('express');
const app = express();
const port = 4000;
const db = require('./config/mongoose')
const User = require('./models/userSchema')
app.use(express.json());//Using middleware
app.get('/', (req, res) => {
    res.send('Nicely Working')
})
app.get('/users/all', async (req, res) => {
    const all_users = await User.find({})
    res.json({
        success: true,
        all_users,
    })
})
app.post('/users/new', async (req, res) => {
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
})

app.get('/usersid/',async (req,res) => {
    console.log(req.query);
    const id = req.query.id
    res.json({
        success: true,
        message: `User Exist With ID ${id}`,
    })
})
app.listen(port, (err)=>{
    if (err) {
        console.log('Error in running the server');
        return
    }

    console.log('The server is running on port no.', port);
})