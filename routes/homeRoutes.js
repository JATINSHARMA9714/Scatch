const express = require('express');
const router = express.Router();
const {isLoggedIn} = require("../controllers/isLoggedIn");
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/',isLoggedIn, async (req, res) => {
    let products = await productModel.find();
    res.render('home',{products})
});

router.get("/product/:id",async(req,res)=>{
    const {id} = req.params;
    let product = await productModel.findOne({_id:id});
    if(product){
        res.render("product",{product})
    }
    else{
        res.redirect("/home")
    }
})

router.get("/addtocart/:productid",isLoggedIn,async(req,res)=>{
    const {productid} = req.params;
    let user = await userModel.findOne({email:req.user.email});
    if(!user.cart.includes(productid)){
        user.cart.push(productid);
        await user.save();
    }
    res.redirect("/home")
})


router.get("/cart",isLoggedIn,async function(req, res){
    let {cart} = await userModel.findOne({email:req.user.email}).populate("cart");
    res.render("cart",{cart})
})

router.get("/removefromcart/:id",isLoggedIn,async function(req, res){
    let {id} = req.params;
    let user = await userModel.findOne({email:req.user.email}).populate("cart");
    user.cart = user.cart.filter(item => item._id.toString()!== id);
    await user.save();
    res.redirect("/home/cart")
})

module.exports = router