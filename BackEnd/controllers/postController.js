const Post = require ('../models/PostSchema')
const cloudinary = require('../helpers/cloudinary')
const Comment = require ('../models/CommentSchema') 


    //add new post
const addPost = async (req,res) => {
    try {
        const {description,category,image} = req.body
        const newPost = new Post ({
            description,
            category,
            owner: req.userId,
        
        })
        
        if (image) {
        
            const savedImage = await cloudinary.uploader.upload( image ,{
                timeout: 6000,  //time for upload picture 
                upload_preset:"ProjectPic"
            })
        
        
            newPost.image= {
                url : savedImage.url,
                public_id: savedImage.public_id
            }
            
        }
        
        const savedPost = await newPost.save()
                
        res.json ({
            msg:'Created Post',
            savedPost
        })
    }

    catch (err) {
        
        res.status(400).json(  {errors:[{ msg:err.message }] } ) 
    }
}



    //find all the posts
const getAllPosts = async ( req,res) => {
    try{
        
        const posts = await Post.find({})
            .populate({ path : 'owner' , select:"FirstName LastName Role"})
            .populate('comment')
        res.json (posts)  
    }

    catch (err) {
        res.status(400).json ({errors:[{ msg:err.message }] })
    }
}



    //find user's post
const getMyPosts = async (req,res) => {
    try {
        const posts = await Post.find ({owner:req.userId}).populate({ path : 'owner' , select:"FirstName LastName Role"}).populate('comment')
        res.json(posts)   
        
    }
    
    catch (err) {
        res.status(400).json ({errors:[{ msg:err.message }] })
    }
}



    //delete user's post 
const deletePost = async  (req , res) => {
    
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        res.json (deletedPost)
    }

    catch (err) {
        res.status(402).json({errors:[{ msg:err.message }] } )
    }
}



    //delete button for admin
const deleteAdminPost = async  (req , res) => {
    
    try {
        const deleteAdminPost = await Post.findByIdAndDelete(req.params.id)
        res.json (deleteAdminPost)
    }

    catch (err) {
        res.status(402).json({errors:[{ msg:err.message }] } )
    }
}






    //update Post
const updatePost = async (req,res) => {
    try{
        const updatePost = await Post.findByIdAndUpdate ( req.params.id,{...req.body})
        res.json (updatePost)
        
    }

    catch (err) {
        res.status(400).json({err: err})
    }
}



   //add comment to post
const  addComment = async (req,res) => {
    try{
        const {text,post} = req.body 
        const newComment = new Comment ({
            text,
            owner: req.userId,
            post
        }) 

        const savedComment = await newComment.save();
        await Post.findByIdAndUpdate(post,{ $push: { comment: savedComment._id } })
        const savedCommentWithPost = await Comment.findById(savedComment._id) .populate('owner') 
        res.send(savedCommentWithPost);     
    }
    catch(err) {
        res.status(400).json({errors:[{ msg:err.message }] } )
    }
}  



    //get all comments
const getComment = async (req,res) => {
    try{
        const comments = await Comment.find({})
            .populate('post') 
            .populate({ path : 'owner' , select:"FirstName LastName Role"})

        res.json (comments)
    }

    catch(err){
        res.status(400).json({errors:[{ msg:err.message }] } )
    }
} 



    //update comment
const updateComment = async (req,res) => {
    try{
        const updateComment = await Comment.findByIdAndUpdate ( req.params.id,{...req.body})
        res.json (updateComment)
    }
    catch(err){
        res.status(400).json({err: err})
    }
} 



    //delete comment
const deleteComment = async (req,res) => {
    try{
        const deleteComment = await Comment.findByIdAndDelete(req.params.id)
        res.json (deleteComment)
    }

    catch(err) {
        res.status(402).json({errors:[{ msg:err.message }] } )
    }
} 


const deleteAdminComment = async (req,res) => {
    try{
        const deleteAdminComment = await Comment.findByIdAndDelete(req.params.id)
        res.json (deleteAdminComment)
    }

    catch(err) {
        res.status(402).json({errors:[{ msg:err.message }] } )
    }
} 


    //PostCount
const getPostsCount = async (req, res) => {
    try {
        const count = await Post.find().countDocuments()
        res.json({ count })
    }
    
    catch (err) {
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
}  



module.exports = {addPost, getAllPosts , getMyPosts, deletePost , updatePost , addComment , getComment  ,updateComment ,deleteComment , getPostsCount ,deleteAdminPost , deleteAdminComment }