const express = require('express');
const { hashPassword } = require('../utils/passwordHashing');
const userModel = require('../models/user-model');
const adminModel = require('../models/admin-model');
const { passwordCompare } = require('../utils/passwordCompare');
const {generateToken} = require('../utils/generateToken');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup-login');
});

router.post('/signup', async (req, res) => {
    try {
        const {email} = req.body;
        let user = await userModel.findOne({email});
        if(user){
            console.log("Something went wrong");
            res.redirect('/')
        }
        else{
        let token = await hashPassword(req.body,res); 
        res.cookie("token",token);
        res.redirect('/home')
        }
    } catch (error) {
        console.log(error.message)
    }
})

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    let admin = await adminModel.findOne({ email: email });
    if(admin){
        if(admin.password == password){
            let token = generateToken(admin);
            res.cookie('token',token);
            res.redirect('/admin/home')
        }
        else{
            res.redirect('/home');
        }
    }
    else{
    let user = await userModel.findOne({email});
    if(user){
    passwordCompare(req.body,user,res)
    }
    else{
        console.log("Email or password incorrect");
        res.redirect('/')
    }
}
})


router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/')
})



module.exports = router;