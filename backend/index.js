const express=require('express')
const app=express();
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const path=require('path')
const cookieParser = require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')
const postRoute=require('./routes/post')
const commentRoute=require('./routes/comments')

app.use(cors())
const corsOptions={
    origin:'*', //allows all urls
    credential:true, //only logged in users can see blogs    
}

app.use(cors(corsOptions))

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is connected sucessfully")
    }
    catch(err){
        console.log(err);
    }
}

//middleware
dotenv.config()
app.use(express.json())

app.use("/images",express.static(path.join(__dirname,"/images")))
console.log(cors())

app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

//code for upload image 
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})
const upload = multer({storage:storage})
app.post("api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image Uploaded Successfully")
})


app.listen(process.env.PORT,()=>{
    connectDB();
    console.log("app is running on port:"+process.env.PORT)
})