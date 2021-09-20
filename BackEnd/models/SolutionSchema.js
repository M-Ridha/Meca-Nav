const mongoose = require ('mongoose')
const moment = require('moment-timezone')

const solutionSchema = mongoose.Schema ( {

    image : {
        type : mongoose.Schema.Types.Mixed,
        required : true
    },

    panne : {
        type : String ,
        required : true
    },    

    description :[{
        cause : { 
            type:String,
            required : true
        },
        remede: {
            type:String,
            required : true
        }     
    }],

    createdAt:{
        type : Date,
        default:moment(Date.now()).tz('Europe/Paris').format('LLLL')
    },

    owner : {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },

})


module.exports = mongoose.model('solution', solutionSchema)