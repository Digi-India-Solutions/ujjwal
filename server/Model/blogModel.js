const mongoose = require('mongoose');
const { type } = require('os');

const blogSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    content:{
        type:String,
    },
    image:{
        type:String,
    },
});

module.exports = mongoose.model('Blog',blogSchema);