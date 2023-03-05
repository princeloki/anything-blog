const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const users = require('./Models/Users')
const User = mongoose.model('User', users.schema)
const bcrypt = require('bcrypt');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')

const apiRouter = require('./routes/api')

const JWTStrategy = passportJWT.Strategy

const app = express()

// app.use('/uploads', express.static('uploads'));

require('dotenv/config')
app.use(passport.initialize())


app.use(cors({
    origin: 'https://anythngblog.com/',
    optionsSuccessStatus: 200
  }));

  

app.use(cors({
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
  }));
  

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Incorrect Password'
                });
            }
        } else {
            return done(null, false, {
                message: 'User not found'
            });
        }
    } catch (err) {
        return done(err);
    }
}));


passport.use(new JWTStrategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}, async (jwt_payload, done) =>{
    try{
        const user = await User.findOne({email: jwt_payload.user.email})
        if(user.id === jwt_payload.user._id){
            return done(null, user)
        } else {
            return done(null, false, {
                message: "Token not matched"
            })
        }
    } catch(err){
        return done(done, err)
    }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', apiRouter);

app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "/client/src/index.html"));
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

app.listen(process.env.port || 3000,'127.0.0.1', ()=>{
    console.log('listening on port 3000')
})

