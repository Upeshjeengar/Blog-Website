const express=require('express')
const router=express.Router()
const user=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comments')
const verifyToken=require('../verifyToken')

//updating profile
router.put("/:id",verifyToken,async(req,res)=>{
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hashSync(req.body.password,salt);
        }
        const updatedUser=await UserActivation.findByIDAndUpdate(req.params.id,
            {$set:req.body},
            {new:true}
        );
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
});

//Delete
router.delete("/:id",verifyToken,async(req,res)=>{
    try{
        await user.findByIDAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deletMany({userId:req.params.id})
        res.status(200).json("user deleted Successfully")
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Get User
router.get("/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports=router
