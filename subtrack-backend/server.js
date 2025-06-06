const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); 
const {getuser} = require('./practice')
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


getuser()
app.get('/', (req, res) => {
    res.status(200).json('Hello, World!');
});
  
// Import routes
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const paymentRoutes = require('./routes/payment.routes');
const webhookRoutes = require('./routes/webhook.routes');

// Use routes
app.use("/api/v1/users", userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('api/v1/payments', paymentRoutes);

// Webhook route for razorpay
app.use('/api/v1/webhook', webhookRoutes);

try {
    if(connectDB()){
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    }else{
        throw new Error("MongoDB connection failed");
    }
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
    
}
