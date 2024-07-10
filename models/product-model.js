const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName:String,
    productPrice:Number,
    discountPrice:Number,
    productImage:Buffer,
    bgColor:String,
    panelColor:String,
    textColor:String
})

module.exports = mongoose.model("product",productSchema);