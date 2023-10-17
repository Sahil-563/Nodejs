// My first Express Server
const { log } = require('console');
const express = require('express');
const port = 8000
const app = express()
const path = require('path')
//Returning a response to the page
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded()); //It is a parser parser is also a middleware  It takes data which is submitted by a form convert into an object

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
var contactList = [
    {
        name:'Sahil',
        phone:'123456789'
    },
    {
        name:'Vishal',
        phone:'6789101112'
    },
    {
        name:'Ishan',
        phone:'1541785442'
    }
]
app.get('/', function(req,res) {
    return res.render('home',{
        title:'RENDERING FROM SERVER',
        contact_List:contactList,
    })
})
app.get('/practice',function(req, res) {
    return res.render('practice',{title:'Practice'})
})
app.post('/create-contact',function(req, res) {
    // console.log(req.body);
    contactList.push({
        name:req.body.name,
        phone:req.body.phone
        //we can also do req.body
    })
    return res.redirect('/')
})

//getting the id which contact is to be delet
// app.get('/delete-contact/:phone',function(req, res) {
//     console.log(req.params);
// })
//Another way of having the data from url
app.get('/delete-contact/',function(req, res) {
    console.log(req.query.phone);
    let phone = req.query.phone;
    //Now we have to find the index of this phone number 
    //For that we have a function in js which is
    let contactIndex = contactList.findIndex(contact => contact.phone==phone);
    if(contactIndex!=-1){
        contactList.splice(contactIndex,1)
    }
    return res.redirect('back')
})
app.listen(port,(err)=>{
    if(err){
        console.log('Error in running the server');
        return
    }
    
    console.log('The server is running on port no.',port);
})