const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message:"Unauthorized: No token"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');

        if(!req.user){
            return res.status(401).json({message:"user not found"});
        }

        next();

    } catch (error) {
        console.error('JWT Error:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = protect;