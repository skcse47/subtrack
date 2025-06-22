const razorpay = require('../utils/razorpay');
const crypto = require('crypto');
const User = require('../models/user.model');

const createOrder = async(req, res) => {

    try {
        const {amount} = req.body;
        const payload = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            notes: {
                userId: req.user._id.toString() 
            }
        }

        const order = await razorpay.orders.create(payload);

        if(order){
             res.status(200).json({
                success: true,
                orderId: order.id,
                amount: order.amount,
                currency: order.currency
            });
        }
    } catch (error) {
        console.error(`Error creating order ${error}`)
         res.status(500).json({message: error});
    }
}

const verifyPayment = async (req, res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    // Form expected signature

    const sign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

    if(sign === razorpay_signature){
        console.log(req.user._id)
        try {
            await User.findByIdAndUpdate(req.user._id, { $set: { isSubscribed: true } });
            res.status(200).json({message: "verified and user subscribed"})
          } catch (error) {
            console.error('Error updating user subscription:', error);
            res.status(400).json({message: "Something went wrong"})
          }
    }
}


const razorpayWebhook = async (req, res) => {
    const body = JSON.stringify(req.body);
    const signature = req.headers['x-razorpay-signature'];

    const sign = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

    if(sign === signature){
        console.log('webhook verified');

        // process event
        const event = req.body.event;
        const payload = req.body.payload;
        const userid = req.body.payload.payment.entity.notes.userId;

        if(event == 'payment.captured'){
            const paymentEntity = payload.payment.entity;
            try {
                await User.findByIdAndUpdate(userid, {isSubscribed: true});
                console.log("Payment captured:", paymentEntity);
            } catch (error) {
                console.log("Payment not captured:", error);
            }

            res.status(200).json({message: "payment capture webhook"});
        }else {
            console.log("Unhandled event:", event);
            res.status(200).json({ success: true });
        }

    }else {
        console.warn("Invalid webhook signature");
        res.status(400).json({ success: false, message: "Invalid signature" });
      }

}


module.exports = {createOrder, verifyPayment, razorpayWebhook}