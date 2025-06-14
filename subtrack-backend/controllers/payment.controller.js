const razorpay = require('../utils/razorpay');

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

module.exports = createOrder