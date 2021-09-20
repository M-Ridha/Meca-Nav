const User = require('../models/UserSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require ('config')
const { validationResult } = require('express-validator');




    //register new user 
const register = async (req,res)=>{
    try{
            //valid form email and PassWord
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({errors : errors.mapped()})
            
            //register user if he don't exist 
        const {FirstName,LastName,email,Password}=req.body
        const user = await User.findOne({email})

        if(user)
            return res.status(400).json({errors: [{msg:'user exist !'}] })

        const newUser = new User ({
            FirstName,
            LastName,
            email,
            Password
        })

           //bcrypt: to encrypt the Password of user
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(newUser.Password,salt);
        newUser.Password = hash;
            
            //save the new user in DB
        const  registeredUser = await newUser.save();    
        const payload ={
            sub: registeredUser._id,
        }
        const token = await jwt.sign(payload,config.get("JWT_CONFIG.SECRET"))
        res.json({token})
    }
    
    catch(err) {
        res.status(500).json( { errors:[{ msg:err.message }] })
    }
}



    //Login User
const login = async (req,res) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({errors : errors.mapped()})
        //check if the email is in the database
    const {email,Password}=req.body;
    await User.findOne({email})
    .then(async(user)=>{
        if(!user){
            /*  errors.email = 'Email not found , Please register before';
            res.status(404).json(errors) */
            return res.status(404).json( { errors:[ {msg:'Email not found , Please register before'} ] } )
        }
        await bcrypt.compare(Password, user.Password)
        .then( async(isMatch)=>{
            if(!isMatch){
                return res.status(404).json( { errors:[ {msg:'wrong password'} ] } )
                //if the user information is correct, res:user id (profil)
            }
            const payload = {
                sub : user._id
            }
            const token = await jwt.sign(payload,config.get("JWT_CONFIG.SECRET"))
            res.json({token,role:user.Role})
        })
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    }) 

}    



    //get User Profile after login
const getUserProfile = async (req, res ) => {
    try{
        const user = await User.findById(req.userId).select({Password: 0})
        res.json(user)
    }

    catch(err){
        res.status(500).json({errors:[{ msg:err.message }] })
    }
}



    //get all users 
const getAllUsers = async (req,res) => {
    try {
        const users = await User.find({})
        res.json ({users})
    }

    catch (err) {

    }
}     



    //UserCount
const getUserCount = async (req, res) => {
    try {
        const userCount = await User.find().countDocuments()
        res.json({ userCount })
    }
    
    catch (err) {
        res.status(400).json({ errors: [{ msg: err.message }] })
    }
} 



    //deleteUser'sProfil
const deleteProfil = async (req,res) => {
    try{
        const deleteProfil = await User.findByIdAndDelete(req.params.id)
        res.json(deleteProfil)
        res.json()
    }

    catch(err) {
        res.status(402).json({errors:[{ msg:err.message }] } )
    }
}    


module.exports = {register, login, getUserProfile,  getUserCount  , deleteProfil ,getAllUsers }