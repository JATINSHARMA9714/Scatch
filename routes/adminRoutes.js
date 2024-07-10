const express = require('express');
const productModel = require('../models/product-model');
const adminModel = require('../models/admin-model');
const router = express.Router();
const multer = require('multer');
const { hashPassword } = require('../utils/passwordHashing');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/home', (req, res) => {
    res.render('admin');
});

router.get('/createAdmin', async(req, res) => {
    let admin = await adminModel.create({
        fullName:'jatin',
        email:'jatin@gmail.com',
        password:'123',
    })
    
    res.redirect('/admin/home')
})

router.post('/createProduct',upload.single('productImage'),async(req,res)=>{
    const {productName,productPrice,discountPrice,bgColor,panelColor,textColor,productImage} = req.body;
    let product = await productModel.create({
        productName,
        productPrice,
        discountPrice,
        bgColor,
        panelColor,
        textColor,
        productImage:req.file.buffer
    })
    res.redirect('/admin')
})

module.exports = router