const express = require("express");
const router = express.Router();
const protect = require('../middlewares/auth.middleware')
const createOrder = require('../controllers/payment.controller');


router.get("/", (req, res) => {
    res.status(200).json({ message: "Payment route is working!" });
})

router.post('/createOrder', protect, createOrder)

module.exports = router;