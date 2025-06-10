const jwt = require('jsonwebtoken');
const user = require('../models/user.model');

const protect = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message:"Unauthorized: No token"})
        }
    } catch (error) {
        
    }
}