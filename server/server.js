// Load environment variables
require ('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");

// Initialize Express app
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/posts', require('./routes/postRoute'));
app.use('/api/categories', require('./routes/categoryRoute'));
app.use('/api/auth', require('./routes/authRoute'));

// Root route
app.get('/', (req, res) => {
  res.send('MERN Blog API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serve running on this http://localhost:${PORT}`);
});
  

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     success: false,
//     error: err.message || 'Server Error',
//   });
// });