const mongoose = require ('mongoose')
const moment = require('moment-timezone')


const postSchema = mongoose.Schema ({
    
    description:{
        type:String,
        required : true
    },    
    
    owner : {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    
    createdAt:{
        type : Date,
        default:moment(Date.now()).tz('Europe/Paris').format('LLLL')
    },
    
    image : {
        type : mongoose.Schema.Types.Mixed
    },

    category : {
        type:String,
        required : true
    }, 

    comment : [{
        type:mongoose.Types.ObjectId,
        ref: 'comment',
        
    }] 

}) 

module.exports = mongoose.model('post', postSchema)