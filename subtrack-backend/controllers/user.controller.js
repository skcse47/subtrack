const User = require("../models/user.model");
const redisClient = require("../utils/redisClient");
const generateToken = require("../utils/token");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const isUser = await User.findOne({ email });
    if(isUser){
        return res.status(400).json({message: "User already exists."});
    }

    const createUser = await User.create({
        name,
        email,
        password,
        role: "user",
    });

    if(!createUser){
        return res.status(500).json({message: "Failed to create user."});
    }
    res.status(201).json({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        role: createUser.role,
        isSubscribed: createUser.isSubscribed,
        token: generateToken(createUser._id),
    });
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});

    if(!user || !await user.comparePassword(password)){
       return res.status(404).json({message: "Invalid email or password"});
    }

    const token = generateToken(user._id);
    res.clearCookie('token');
    res.cookie("token", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        samSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000
    });
    await redisClient.setEx(`user:${user._id}`, 3600, JSON.stringify(user));
    
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isSubscribed: user.isSubscribed,
        token: token
    },);
}

const userProfile = async(req, res) => {
    const userId = req.user._id;

    try {
        // const cachedUser = await redisClient.get(`user:${userId}`);
        // console.log(cachedUser)
        // if(cachedUser){
        //     return res.status(200).json(JSON.parse(cachedUser));
        // }

        const userData = await User.findById(userId).select("-password");

        if(!userData){
            return res.status(404).json({message: "No user found."})
        }

        //set user in redis 
        await redisClient.setEx(`user:${userId}`, 3600, JSON.stringify(userData));

        res.status(200).json(userData);

    } catch (error) {
        
    }

}


module.exports = {loginUser, registerUser, userProfile};