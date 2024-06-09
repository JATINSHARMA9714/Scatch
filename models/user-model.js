const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname:{
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
    cart:[
        {type:String}
    ],
    orders:[{
        type:String
    }],
    phone:{
        type:String
    },
    address:[
        {type:String}
    ],
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("user",userSchema);