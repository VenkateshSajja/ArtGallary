require('dotenv').config(); // Load environment variables
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI; // Use the URI from .env

const mongoDB = async () => {
  try {
    // Connect to MongoDB without deprecated options
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("Connected to DB successfully");

    // Fetch the 'articles' collection
    global.articles = await mongoose.connection.db.collection("articles").find({}).toArray();

    // Fetch the 'paintingCategory' collection
    global.paintingCategory = await mongoose.connection.db.collection("paintingCategory").find({}).toArray();

    console.log("Data fetched and assigned to global variables");
  } catch (error) {
    console.error("Error connecting to the database or fetching data:", error);
  }
};

module.exports = mongoDB;
