const express=require('express')
const cors = require("cors");
const User=require('../Models/userModel.js')
const UserRoute=require('../Routes/route.js')
const connectDb=require('../config/db.js')

require('dotenv').config()



connectDb();
const app =express()
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,  
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // frontend URL
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // respond to preflight immediately
  }
  next();
});

app.use(express.urlencoded({extended:false}))

app.use("/api",UserRoute);
app.get('/',(req,res)=>{
    res.send("hellon")
})




app.listen(3000,()=>{
    console.log("server is running")
})

