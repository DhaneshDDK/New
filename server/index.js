const express = require('express');
const app = express();
app.use(express.json());


const cors = require('cors');
app.use(cors({
    origin: 'https://frontend-one-eta-41.vercel.app/',
    credentials : true
  }));

  
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is up on port number ${port}`);
})

const dbConnect = require('./Config/Database');
dbConnect();

const {cloudinaryConnect} = require('./Config/Cloudinary');
cloudinaryConnect();

const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,    
    tempFileDir : '/tmp/'
}));

app.get('/',(req,res)=>{
    res.json({
        message : "Welcome to StudyNotion api",
    })
})


const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");



//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

