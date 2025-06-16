const express = require("express");
const router = express.Router();
const protect = require('../middlewares/auth.middleware')
const {createOrder,verifyPayment, razorpayWebhook} = require('../controllers/payment.controller');


router.get("/", (req, res) => {
    res.status(200).json({ message: "Payment route is working!" });
})

router.post('/createOrder', protect, createOrder)
router.post('/verifyPayment', protect, verifyPayment)
router.post('/razorpayWebhook', razorpayWebhook)

module.exports = router;