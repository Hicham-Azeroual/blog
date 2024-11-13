import bcryptjs from "bcryptjs"; // Single import statement
import User from "../models/user.module.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Function to register a new user
export default async function signup(req, res, next) {
  const { username, email, password } = req.body;

  try {
    // Check that all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Return success response
    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error handling middleware
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Find the user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Compare the password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin }, // payload
      process.env.JWT_SECRET, // secret key from environment variable
      { expiresIn: '1h' } // optional: set token expiry time
    );

    // Destructure the user object to exclude the password field
    const { password: pass, ...rest } = validUser._doc;

    // Send response with cookie and user data (excluding password)
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true, // secure, httpOnly cookies that cannot be accessed by JavaScript
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // Prevent CSRF attacks
      })
      .json(rest); // Return the user data, excluding password
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
