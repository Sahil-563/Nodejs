// My first Express Server
const { log } = require('console');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const port = 8000
const db = require('./config/mongoose')//Connecting to database
const Contact = require('./models/contact') //Connectning to the schema of our database
const User = require('./models/userSchema') //Connectning to the user schema of our database
const app = express()
const path = require('path')
//Returning a response to the page
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded()); //It is a parser parser is also a middleware  It takes data which is submitted by a form convert into an object
app.use(cookieParser()); //used to parse the cookies
//Creating our own middleware
// app.use(function(req, res, next) {
//     // console.log('Middleware 1 is called');
//     req.name ='Sahil'
//     next();
// })
// app.use(function(req, res, next) {
//     // console.log('Middleware 2 is called');
//     console.log('from middleware 2 name is ',req.name);
//     next();
// })

//Accessing static files using the express middleware
app.use(express.static('assets'))
//Creating data which is to be displayed on webpage
// var contactList = [
//     {
//         name: 'Sahil',
//         phone: '123456789'
//     },
//     {
//         name: 'Vishal',
//         phone: '6789101112'
//     },
//     {
//         name: 'Ishan',
//         phone: '1541785442'
//     }
// ]
// app.get('/', function (req, res) {
//     return res.render('home', {
//         title: 'RENDERING FROM SERVER',
//         contact_List: contactList,
//     })
// })



//We have created a middleware which will check that the user is logged in(means cookie is present) or user is logged out(means cookie is not present)
const isAuthenticated = async (req, res, next) => {
    // console.log(req.cookies);//Since we are redirectind to '/' so we can access the cookie from here
    // console.log('Token is',req.cookies.token);
    const token = req.cookies.token
    if (token) {
        const decodeddata=jwt.verify(token,'sbcd')
        req.userData = await User.findById(decodeddata.id)
        next(); // When this middleware is passed this statement then next resposnse will be executed
    }
    else {
        res.redirect('/login') //if the token is not present then login page will be rendered
    }
}
//Fetching or finding data from database
//Firstly before rendering '/' home page '/' this route have to be passed from a middleware which is isAuthenticated 
app.get('/', isAuthenticated, async function (req, res) {
    // console.log(req.userData);
    try {
        const contact = await Contact.find();
        // console.log(contact);
        return res.render('home', {
            title: 'RENDERING FROM SERVER',
            greet:req.userData.name,
            contact_List: contact,
        })
    }
    catch (err) {
        console.error('Error fetching data from MongoDB', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

// Mongoose now take a promise instead of a callback
app.post('/create-contact', async function (req, res) {
    // console.log(req.body);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    //     //we can also do req.body
    // })

    //Popultaing post request in databse
    try {
        const contact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
        console.log("Contact is created with phone number", contact.phone, ' and name', contact.name);
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating contact', err);
        return res.status(500).send('Error in creating contact');
    }
});


//getting the id which contact is to be delet
// app.get('/delete-contact/:phone',function(req, res) {
//     console.log(req.params);
// })

//Another way of having the data from url using query params
app.get('/delete-contact/', async function (req, res) {
    try {
        let id = req.query.id; //Get the 24 hex character string id from url 
        // console.log(typeof id);
        const deletedUser = await Contact.findByIdAndRemove(id);//To delete anything from database we use findByIdAndRemove() method and also to delete anything from db is async request so we keep it into a try and catch block
        console.log('Contact is deleted with name: ' + deletedUser.name + ' and mobile number: ' + deletedUser.phone);
        return res.redirect('back');
    }
    catch (err) {
        console.error(err); //If any error occured then will print error
    }
})
app.get('/login', function(req, res) {
    res.render('login');
})
app.get('/register', function(req, res) {
    res.render('register');
})
app.post('/login', async function(req, res) {
    const{email,password}=req.body;
    let user = await User.findOne({email})
    if(!user){
        return res.redirect('/register')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.render('login',{email,message:'Incorrect password'})
    }
    const token = jwt.sign({id:user.id},'sbcd');
    res.cookie('token', token, {
        httpOnly: true,

    })
    res.redirect('/')
})
app.post('/register', async function (req, res) {
    //Creating a cookie for login session
    // console.log(req.body);
    const{name,email,password} = req.body;
    let user = await User.findOne({email})
    if(user){
        return res.redirect('/login');
    }
    const hashedpasword = await bcrypt.hash(password,10);

    
    try {
        const user = await User.create({
            name,
            email,
            password:hashedpasword,
        });
        const token = jwt.sign({id:user.id},'sbcd');
        console.log("User is created with name", user.name, ' and email', user.email);
        res.cookie('token', token, {
            httpOnly: true,
    
        })
        return res.redirect('/login')
    }
    catch (err) {
        console.log('Error in creating User', err)
    }
   
})
app.get('/logout', function (req, res) {
    //Creating a cookie for login session
    res.cookie('token', null, {
        httpOnly: true, expires: new Date(Date.now())

    })
    return res.redirect('/')
})


app.listen(port, (err) => {
    if (err) {
        console.log('Error in running the server');
        return
    }

    console.log('The server is running on port no.', port);
})