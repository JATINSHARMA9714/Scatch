const express = require('express');
const { hashPassword } = require('../utils/passwordHashing');
const userModel = require('../models/user-model');
const { passwordCompare } = require('../utils/passwordCompare');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup-login');
});

router.post('/signup', (req, res) => {
    try {
        hashPassword(req.body,res); 
        res.redirect('/home')
    } catch (error) {
        console.log(error.message)
    }
})

router.post('/login',async (req,res)=>{
    const email = req.body.email;
    let user = await userModel.findOne({email});
    passwordCompare(req.body,user,res)
})


router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/')
})



module.exports = router;