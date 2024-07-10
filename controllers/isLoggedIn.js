const jwt = require('jsonwebtoken');

module.exports.isLoggedIn = function isLoggedIn(req, res, next) {
    let token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                // Token verification failed
                res.redirect('/');
            } else {
                // Token is valid, attach user data to request if needed
                req.user = decoded; // optional: attach decoded token to req
                next();
            }
        });
    } else {
        // No token present
        res.redirect('/');
    }
};
