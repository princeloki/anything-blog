const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('dotenv/config')
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    optionsSuccessStatus: 200
  }));

app.post('/register', (req, res) => {
    res.send(req.body)
})

app.post('/login', (req, res) => {
    res.json({message: "Login targetted"})
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