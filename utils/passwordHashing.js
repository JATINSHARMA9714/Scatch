const bcrypt = require('bcrypt');
const userModel = require('../models/user-model');
const { generateToken } = require('./generateToken');

module.exports.hashPassword = ({fullname,email,password
},res) =>{ bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
            console.log(err.message);
        }
        else {
            let createdUser = await userModel.create({
                fullname,
                email,
                password: hash
            })
            let token = generateToken(createdUser);
            res.cookie('token',token);
        }
    })
})
}