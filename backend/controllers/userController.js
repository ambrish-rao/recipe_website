import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Does Not Exist" });
        }
        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect Password" });
        }
        // Create JWT token for the user
        const token = createToken(user._id);
        // Send success response with token
        res.json({ success: true, message: "Login Successful", token });
    } catch (error) {
        // Log and send error response
        console.error("Error logging in user:", error);
        res.json({ success: false, message: "Error logging in user" });
    }
};

// Function to create JWT token using user ID
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
    try {
        // Destructure name, email, and password from request body
        const { name, email, password } = req.body;

        // Check if user already exists with the same email
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Email already registered" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email address." });
        }

        // Check password length and strength
        if (password.length < 8 || !validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "Weak password. Use a mix of letters, numbers, and symbols." });
        }

        // Generate salt for hashing
        const salt = await bcrypt.genSalt(10);

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user document
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // Save the user to the database
        const user = await newUser.save();

        // Create JWT token for the new user
        const token = createToken(user._id);

        // Send success response with token
        res.json({ success: true, message: "User registered successfully", token });

    } catch (error) {
        // Log and send error response
        console.error("Error registering user:", error);
        res.json({ success: false, message: "Error registering user" });
    }
};

export { loginUser, registerUser };
   

// git add . 
// git commit -m "Updated Recipe Website" 
// git push