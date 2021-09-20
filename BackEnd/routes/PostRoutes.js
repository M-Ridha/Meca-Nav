const router = require('express').Router();
const postController = require('../controllers/postController')
const {tokenMiddleware,checkPostOwner,checkCommentOwner, adminMiddleware} = require ('../middlewares/tokenMiddleware')


    //post route
router.post('/addpost', tokenMiddleware, postController.addPost)
router.get('/posts',tokenMiddleware, postController.getAllPosts)
router.get('/myposts',tokenMiddleware, postController.getMyPosts )
router.delete('/deletepost/:id',tokenMiddleware, checkPostOwner  , postController.deletePost)
router.delete('/deleteAdminpost/:id',tokenMiddleware, adminMiddleware, postController.deleteAdminPost) 
router.put('/updatepost/:id', tokenMiddleware, checkPostOwner, postController.updatePost)
router.get('/postcount', tokenMiddleware, postController.getPostsCount)

    //comment route
router.post('/addcomment',tokenMiddleware, postController.addComment)
router.get('/getcomment',tokenMiddleware, postController.getComment  )  
router.delete('/deleteComment/:id',tokenMiddleware, checkCommentOwner ,postController.deleteComment) 
router.delete('/deleteAdminComment/:id',tokenMiddleware, adminMiddleware ,postController.deleteAdminComment)
router.put('/updateComment/:id',tokenMiddleware,checkCommentOwner,postController.updateComment )  


module.exports=router
