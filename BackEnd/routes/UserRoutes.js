const router = require('express').Router();
const userController = require('../controllers/userController')
const {validationCheck} = require('../middlewares/dataCheckMiddleware')
const {tokenMiddleware, adminMiddleware} = require('../middlewares/tokenMiddleware')


router.post('/register', validationCheck,userController.register)
router.post('/login', validationCheck,userController.login)
router.get('/getProfile', tokenMiddleware,userController.getUserProfile)
router.get('/getAllUser', tokenMiddleware,/* adminMiddleware, */userController.getAllUsers)
router.get('/userCount', tokenMiddleware,/* adminMiddleware , */ userController.getUserCount)
router.delete('/deleteProfile/:id',tokenMiddleware,userController.deleteProfil )


module.exports=router