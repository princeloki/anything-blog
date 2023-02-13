const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const users = require('../Models/Users')
const User = mongoose.model('User', users.schema)
const express = require('express')
const passport = require('passport')
const jwt = require("jsonwebtoken")
require('dotenv/config')

const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        const saltRounds = 10
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        let user = await User.findOne({username: req.body.username})
        let users
        if(user){
            res.send({message: "Username already exists"})
        } else{
            let ema = await User.findOne({email: req.body.email})
            if(ema){
                res.send({message: "Email already exists"})
            } else{
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
            }
        }
    }catch (err) {
        res.json({error: err.message});
    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if(err){
            return next(err);
        }
        if(!user){
            return res.send("Wrong username or password");
        }
        req.login(user, () => {
            const body = {_id: user.id, email: user.email}
            const token = jwt.sign({user:body}, process.env.SECRET_KEY)
            return res.json({token})
        })
    })(req, res, next)
})

router.get('/secret', passport.authenticate("jwt", { session:false }), (req, res, next) => {
    if(!req.user){
        res.json({
            username: "nobody"
        })
    } else {
        if(req.user.type=="Reader"){
            res.json({
                type: "Reader",
                username: req.user.username,
                email: req.user.email,
                blogs: req.user.blogs,
                subscribed: req.user.subscribed,
                image: ""
            })
        } else if(req.user.type=="Creator"){          
            res.json({
                type: "Creator",
                username: req.user.username,
                email: req.user.email,
                blogs: req.user.blogs,
                subscribed: false,
                image: ""
            })
        }
    }
})

module.exports = router;

