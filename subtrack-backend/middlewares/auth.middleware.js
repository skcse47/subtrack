const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        // const authHeader = req.headers.authorization;
        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     return res.status(401).json({ message: 'Unauthorized: No token provided' });
        // }
        // const token = authHeader.split(' ')[1];
        // if(!token){
        //     return res.status(401).json({message:"Unauthorized: No token"})
        // }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const profile = await User.findById(decoded.userId).select('-password');

        if(!profile){
            return res.status(401).json({message:"user not found"});
        }
        req.user = profile;

        next();

    } catch (error) {
        console.error('JWT Error:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = protect;