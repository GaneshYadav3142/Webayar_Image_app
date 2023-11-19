const express = require('express');
const mongoose = require('mongoose');

const dotenv=require("dotenv");
const userRouter = require('./Router/userRouter');
const authMiddleware = require('./AuthMiddleware/middleware');
const imageRouter = require('./Router/imageRouter');
dotenv.config()
const app = express();


app.use(express.json());


app.use("/users",userRouter)
app.use(authMiddleware)

app.use("/images",imageRouter)

app.listen(8080,async()=>{
    try {
        mongoose.connect(process.env.URL)
        console.log("Server is listening at port 8080")
    } catch (error) {
        console.log("server error")
    }
})