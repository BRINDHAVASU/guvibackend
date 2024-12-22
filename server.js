require('dotenv').config();  // Load environment variables

console.log("DB_URI:", process.env.DB_URI);  // Log the DB_URI to check if it's loaded
console.log("PORT:", process.env.PORT);      // Log the PORT to check if it's loaded

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Get port from environment variables, default to 3000 if not set
const PORT = process.env.PORT || 3000;

// Get DB_URI from environment variables
const DB_URI = process.env.DB_URI;

// Check if DB_URI is undefined
if (!DB_URI) {
  console.error('Error: DB_URI is not defined in the environment variables.');
  process.exit(1);  // Exit the process if DB_URI is not found
}

// Database connection
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Middleware setup
app.use(express.json());

// Basic route for testing server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT} and URL: http://localhost:${PORT}`);
});
