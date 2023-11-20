const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userModel = require("../models/userModel")
const userRouter=express.Router()

userRouter.post("/register", async(req,res)=>{
    const {name,email,password}=req.body
    console.log(req.body)
    try {
        const userExist=await userModel.findOne({email})
        console.log(userExist)
        if(userExist) {
        res.status(400).send("user Already Exist")
        }
        else{
            const newPassword=await bcrypt.hash(password,10)
            console.log(newPassword)
            const user=await userModel.create({name,email,password:newPassword})
            user.save()
            res.status(200).send({msg:"The new User has been added"})
        }
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})


userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
           const verify= bcrypt.compare(password,user.password)
           if(!verify){
            res.status(400).send("Incorrect Password")
           }
           else{
            const token=jwt.sign({userID:user._id},"ImageApp",{expiresIn:"1d"})
            res.status(200).send({token})
           }
        }
        else{
            res.status(400).send({error:"User not found"})
        }
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})








module.exports=userRouter