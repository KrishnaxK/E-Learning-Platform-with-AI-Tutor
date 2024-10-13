const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for creating and verifying JSON Web Tokens
const responseHandler = require('../utils/responseHandler'); // Custom response handler utility

const AuthController = {
  
  // Function to handle user registration
  register: async (req, res) => {
    const { name, email, password } = req.body; // Destructure user input from the request body
    try {
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // If user exists, return error response
        return responseHandler.error(res, 'User already exists', 400);
      }
      
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document
      const user = new User({ name, email, password: hashedPassword });

      // Save the user to the database
      await user.save();

      // Return success response
      return responseHandler.success(res, 'User registered successfully', { user }, 201);
    } catch (error) {
      // Handle server errors
      return responseHandler.error(res, 'Registration failed', 500);
    }
  },

  // Function to handle user login
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        // If user doesn't exist, return error response
        return responseHandler.error(res, 'Invalid email or password', 400);
      }

      // Compare input password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // If password is invalid, return error response
        return responseHandler.error(res, 'Invalid email or password', 400);
      }

      // Create a JSON Web Token (JWT) valid for 1 hour
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Return success response with the token and user data
      return responseHandler.success(res, 'Login successful', { token, user });
    } catch (error) {
      // Handle server errors
      return responseHandler.error(res, 'Login failed', 500);
    }
  }
};

module.exports = AuthController; // Export the controller for use in routes
