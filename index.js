require('dotenv').config();
const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const userlogin=require("./route");
const playlist=require("./route/playlistroute");
const userInfo=require('./route/userRoute');
const app=express();
app.use(cors())
const userverify=require("./validation/playlistverify");
const bodyParser = require('body-parser');
mongoose.connect(process.env.db_connection, {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/authentication",userlogin);
app.use("/playlist",userverify,playlist);
app.use('/user',userverify,userInfo);
app.listen(process.env.PORT||2000,()=>{
    console.log("server is running");
})