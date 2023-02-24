require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const multer  = require('multer');
const { S3Client, PutObjectCommand, AbortMultipartUploadCommand } = require("@aws-sdk/client-s3"); 
const uploads = multer({ dest: 'uploads/' })


const credentials = {
    region: process.env.BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
  };
  
  const s3 = new S3Client(credentials)
  
  
  const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGOLAB_URI, {useNewUrlParser: true});

const storage = multer.memoryStorage()
const upload = multer({storage})

app.get("/",(req,res)=>{
  console.log(credentials)
    res.render("index")
})

app.post("/image",upload.single('image'), async (req,res)=>{
  console.log(req.file)
    console.log(req.body)

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key:req.file.originalname,
        Body:req.file.buffer,
        Contenttype:req.file.mimetype
    }
    console.log(params)

    const command = new PutObjectCommand(params)

    await s3.send(command)

    res.send({})
})

app.listen(process.env.PORT, function() {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});