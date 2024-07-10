const bcrypt = require('bcrypt');
const userModel = require('../models/user-model');
const { generateToken } = require('./generateToken');

module.exports.hashPassword = async (userData) => {
    const { fullname, email, password } = userData;

    try {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create user in the database
        const createdUser = await userModel.create({
            fullname,
            email,
            password: hash
        });

        // Generate token
        let token = generateToken(createdUser);
        return token;

    } catch (error) {
        console.error(error.message);
    }
};
