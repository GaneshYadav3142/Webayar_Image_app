const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageData: {
        type: Buffer,
        required: true
    }
});

const imageModel = mongoose.model('Image', imageSchema);

module.exports =  imageModel;
