const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment-timezone')

const userSchema = new  Schema ({

    FirstName: String,

    LastName : String,

    email: {
        type: String,
        required: true
    },

    Password: {
        type: String,
        required:true
    },

    createdAt: {
        type: Date,
        default : moment(Date.now()).tz('Europe/Paris').format('LLLL'),
    },

    Image :{
        type: String,
    },

    Role : {
        type: String,
        enum : ['user' , 'admin'],
        default : 'user'
    }

})


module.exports = mongoose.model('user', userSchema)