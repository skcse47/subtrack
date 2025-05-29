const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db'); 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  

// mongoose.connect(process.env.MONGO_URI).then(() =>{
//     console.log('Connected to MongoDB');
//     app.listen(process.env.PORT || 5000, () => {
//         console.log(`Server is running on port ${process.env.PORT || 5000}`);
//     })
// }).catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//     process.exit(1);
// });

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
