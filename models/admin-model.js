const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    products:[{
        type:String
    }],
    phone:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    image:Buffer,
})

module.exports = mongoose.model("admin",adminSchema);