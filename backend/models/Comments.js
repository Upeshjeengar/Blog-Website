const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    Comment:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    //id of person whoose is the post
    postId:{
        type:String,
        required:true,
    },
    //userId of commentor
    userId:{
        type:String,
        required:true,
    },
},{timestamps:true})

module.exports = mongoose.model('Comment',CommentSchema)