const express=require("express");
const userModel = require("../models/userModel");
const imageModel = require("../models/imageModel");
const multer = require('multer');
const imageRouter=express.Router()
const upload = multer();
imageRouter.post('/upload', upload.single('image'), async (req, res) => {
    const  {userID}  = req;
    console.log(req)
    const imageData = req.file.buffer;

    try {
        const user = await userModel.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const image = new imageModel({ user: user._id, imageData });
        await image.save();

        res.json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


imageRouter.get('/all', async (req, res) => {
    const userId  = req.userID;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const images = await imageModel.find({ user: user._id });
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports=imageRouter
