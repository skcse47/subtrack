const express = require('express');
const router = express.Router();
const {loginUser, registerUser } = require("../controllers/user.controller")

router.get('/', (req, res) => {
    res.status(200).json({name: "Suraj"});
});

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
