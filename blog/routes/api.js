


const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const users = require('../Models/Users')
const imageModel = require('../Models/Images')
const blogs = require('../Models/Blog')
const User = mongoose.model('User', users.schema)
const Image = mongoose.model('Image', imageModel.schema)
const Blog = mongoose.model("Blog", blogs.schema)
const fs = require("fs");
const path = require("path");
const express = require('express')
const passport = require('passport')
const jwt = require("jsonwebtoken")
const multer = require('multer');
const Grid = require('gridfs-stream');
const { GridFSBucket } = require('mongodb');
const conn = mongoose.connection;
const nodemailer = require('nodemailer');
require('dotenv/config')

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secureConnection: false,
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        ciphers:'SSLv3'
    }
});


let gfs;
conn.once('open', () => {
  gfs = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

const upload = multer()

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
                        "name": req.body.name,
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
                        "name": req.body.name,
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

router.get('/image/:id', (req, res) => {
  const imageId = req.params.id;
  gfs.find({ _id: mongoose.Types.ObjectId(imageId) })
    .toArray((err, files) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Could not retrieve file.');
      }
      if (files.length === 0) {
        return res.status(404).send('File not found.');
      }
      const readStream = gfs.openDownloadStream(mongoose.Types.ObjectId(imageId));
      readStream.pipe(res);
    });
});


router.post('/upload', async (req, res) => {
  await upload.single('img')(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Could not upload file.');
    } else {
      if (req.file) {
        const { originalname, buffer, mimetype } = req.file;
        const writeStream = gfs.openUploadStream(originalname, {
          contentType: mimetype,
          chunkSize: 64 * 1024,
        });
        writeStream.on('finish', (file) => {
          const image = new Image({
            name: originalname,
            fileId: file._id,
          });
          image.save().then(() => {
            res.set('Content-Type', mimetype);
            gfs.openDownloadStreamByName(originalname).pipe(res);
            res.send(`${process.env.WEB_SERVER}/api/image/${file._id}`);
          }).catch((err) => {
            console.log(err);
            res.status(500).send('Could not save image.');
          });
        });
        writeStream.end(buffer);
      } else {
        res.status(400).send('No file uploaded.');
      }
    }
  });
});


router.post('/blogpost', async (req, res) => {
    try{
        const blog = new Blog({
          Title: req.body.Title,
          Author: req.body.Author,
          Date: req.body.Date,
          Category: req.body.Category,
          Mainimg: req.body.Mainimg,
          Blogdata: req.body.Blogdata
        })
        await blog.save()
        res.send({message: "Blog saved successfully"})
    } catch(err){
        res.send({message: err})
    }
})
  
router.post('/update', (req, res) => {
  try{
    User.updateOne({ username: req.body.username }, req.body.blogs)
  } catch(err){
    console.log(err.stack);
  }
})

router.get('/blogs', async (req, res) => {
  try{
    const blogs = await Blog.find({}, '_id Title Author Date Category Mainimg')
    res.send(blogs)
  } catch(err){
    res.send({message: err.stack})
  }
})

router.get('/blogs/:id',async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})


router.post('/contact', (req, res) => {
  const { email, name, query } = req.body;

  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: process.env.EMAIL,
    subject: `Query from ${name}@<${email}>`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${query}`
  }

  transporter.sendMail(mailOptions, function (err, res) {
    if(err){
      console.log(err);
      res.status(500).send("Error: Could not send mail")
    } else{
      console.log('Email sent successfully')
      res.status(200).send('Email sent successfully')
    }
  })
})

router.post('/comment/:id', (req, res) => {
  const id = req.params.id
  const nComments = req.body
  Blog.findOneAndUpdate({ _id: id }, { $set: {Comments: nComments}},
  {returnOriginal: false},
  function(err, result){
    if(err) throw err;

    console.log("Updated comments", result.value);
    res.send(result.value);
  })

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
                name: req.user.name,
                username: req.user.username,
                email: req.user.email,
                blogs: req.user.blogs,
                subscribed: req.user.subscribed,
                image: ""
            })
        } else if(req.user.type=="Creator"){          
            res.json({
                type: "Creator",
                name: req.user.name,
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
