const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const users = require('./Models/Users')
const User = mongoose.model('User', users.schema)
const session = require('express-session')
const bcrypt = require('bcrypt');

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}))

require('dotenv/config')
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    optionsSuccessStatus: 200
  }));

app.post('/register', async (req, res) => {
    try{
        const saltRounds = 10
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        let users
        if(req.body.type === 'Reader'){
            users = new User({
                "type": req.body.type,
                "email": req.body.email,
                "username": req.body.username,
                "password": hash,
                "blogs": [],
                "subscribed": false,
                "image": "",
            })
        } else if(req.body.type === 'Creator'){
            users = new User({
                "type": req.body.type,
                "email": req.body.email,
                "username": req.body.username,
                "password": hash,
                "blogs": [],
                "image": "",
            })
        }
        await users.save() 
        res.send({"message":'User registered'});
    }catch (err) {
        res.json({error: err.message});
    }
})

app.post('/login', (req, res) => {
    res.json({message: "Login targetted"})
})

app.get('/logout', (req, res) => {

})

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology:true },
    (err) =>{
        if(err){
            console.error(err);
        } else {
            console.log("Connected to the Database");
        }
    }
);

app.listen(process.env.port || 3000, ()=>{
    console.log('listening on port 3000')
})