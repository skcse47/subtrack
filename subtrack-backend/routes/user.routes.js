const express = require('express');
const router = express.Router();
const {loginUser, registerUser, userProfile } = require("../controllers/user.controller");
const protect = require('../middlewares/auth.middleware');
const limiter = require('../utils/rateLimit');

router.get('/', (req, res) => {
    res.status(200).json({name: "Suraj"});
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/userProfile', limiter, protect, userProfile);

module.exports = router;
