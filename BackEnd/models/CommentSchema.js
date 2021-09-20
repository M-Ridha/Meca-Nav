const mongoose = require('mongoose')
const moment = require ('moment-timezone')


const commentSchema = mongoose.Schema ({
    
    text : String ,
    
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        
    },
    
    createdAt:{
        type : Date,
        default:moment(Date.now()).tz('Europe/Paris').format('LLLL')
    },

    post: { 
        type: mongoose.Types.ObjectId, 
        ref: 'post' 
    },


})


module.exports = mongoose.model('comment',commentSchema) 

