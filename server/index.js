const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const mongoDB = require('./db'); // Assuming this handles to the DB connection
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3100; // Use Vercel's assigned port

// Initialize MongoDB connection
mongoDB();

// CORS configuration
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB successfully"))
  .catch(err => console.error("Error connecting to the database:", err));

// Simple test route
app.get('/', (req, res) => {
  res.json("Hello");
});

// API Routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/sendInvoice"));

// Start the server
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
