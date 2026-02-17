const jwt = require('jsonwebtoken')
function VerifyUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            message: "you don't have token",
        });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        res.status(401).json({
            message: "unauthorized access",
        });
    };
    req.user = decoded;


    next();
}

module.exports = VerifyUser;