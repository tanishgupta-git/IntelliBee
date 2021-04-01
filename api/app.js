require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const moongoose = require('mongoose');
const authRoutes  = require('./routes/auth');
const articleRoutes = require('./routes/article');
const MONGODB_URI = process.env.MONGODB_URI
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express()

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images/');
  },
  filename: function(req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname)
  }
});

const fileFilter = (req,file,cb) => {
  if (file.mimetype === 'image/png' ||file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
  cb(null,true);
  }else{
      cb(null,false);
  }
}
app.use(bodyParser.json());
app.use(
  multer({ storage : fileStorage,fileFilter:fileFilter}).single('image')
  );
app.use('/images',express.static(path.join(__dirname,'images')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/auth',authRoutes);
app.use('/articles',articleRoutes);

app.use((error,req,res,next) => {
    console.log("error from here",error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message : message,data : data});  
  })

moongoose.connect(MONGODB_URI)
.then( result => {
    app.listen(8080,() => {
        console.log("server started")
    });
})
.catch(err => {
    console.log(err)
})