import express from 'express';
const app = express();
const port = 4000;
import './config/mongoose.js';
import dotenv from'dotenv';

import userRouter from './routes/users.js'

app.use(express.json());//Using middleware
app.use('/users', userRouter)
app.get('/', (req, res) => {
    res.send('Nicely Working')
})

app.listen(port, (err)=>{
    if (err) {
        console.log('Error in running the server');
        return
    }

    console.log('The server is running on port no.', port);
})