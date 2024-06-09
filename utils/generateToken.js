const jwt = require('jsonwebtoken');

module.exports.generateToken = ({email,_id})=>{
    return jwt.sign({email,id:_id},process.env.JWT_KEY)
}