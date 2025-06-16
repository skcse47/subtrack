const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); 
const {getuser} = require('./practice')
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
// app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Explicitly allow your frontend origin
    credentials: true,              // Allow credentials (cookies, etc.)
  }));
// Apply rate limit to all requests

// const limiter = rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 5,
//     message: 'Too many request from this IP'
// });
// app.use(limiter);


// getuser()
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
app.use('/api/v1/payment', paymentRoutes);

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
