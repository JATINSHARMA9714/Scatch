const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken')


module.exports.passwordCompare = ({password},user,res)=>{ 
    bcrypt.compare(password,user.password,function(err,result){
    if(result){
        let token = generateToken(user);
        res.cookie('token',token);
        res.redirect('/home')
    }
    else{
        console.log(err.message);
    }
})
}