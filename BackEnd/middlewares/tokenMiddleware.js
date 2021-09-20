const jwt = require ('jsonwebtoken')
const config = require ('config')
const Post = require ('../models/PostSchema')
const Comment = require ('../models/CommentSchema') 
const user = require ('../models/UserSchema')






    //verifier si token valid ou non + put id in request.userId
const tokenMiddleware = async (req, res ,next ) => {
    try {
        const token = req.header("auth-token")
        if (!token)
            return res.status(401).json( { errors:[ { msg: 'UNTHORIZED OPERATION !'}]})
        
        const payload = await jwt.verify(token,config.get("JWT_CONFIG.SECRET"))
        req.userId = payload.sub
        next()
    }

    catch (err) {
        res.status(401).json({errors:[{msg:err.message}]})
    }
}



    //check if user owns the POST before update or delete post 
const checkPostOwner = async (req, res , next) => {
    try{
        const post = await Post.findOne({ _id:req.params.id , owner: req.userId })
        if (!post)
            return res.status(401).json ( { errors:[{ msg: ' Not authorized !'}] })
        next ()
    }

    catch(err) {
        res.status().json({err : err})
    }
}


    //check if user owns the COMMENT before update or delete post 
const checkCommentOwner = async (req,res,next) => {
    try{
        const comment = await Comment.findOne({_id:req.params.id, owner:req.userId})
        if(!comment)
            return res.status (401).json ({errors:[{ msg: ' Not authorized !'}]} )
        next()    
    }

    catch(err) {
        res.status().json({err : err})
    }
}


    //check if user's Role === admin
const adminMiddleware = async (req, res , next) => {
    const existUser = await user.findById(req.userId)
        
    if (existUser.Role==="admin") {    
        next()
    }
    else{
        return res.status(401).json({msg:"you r not auth"})
    }
}













module.exports = {tokenMiddleware , checkPostOwner, checkCommentOwner , adminMiddleware }

