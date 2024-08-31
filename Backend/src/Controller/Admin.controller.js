import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/AdminLogin.model.js";

// Admin Login
const AdminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(400).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate the token
    const token = jwt.sign({ id: admin._id }, process.env.ACCESS_TOKEN, { expiresIn: '24h' });

    // Set the cookie
    res.cookie('token', token, {
        httpOnly: true, // Cookie cannot be accessed via JavaScript
        secure: false, // Set to true if using HTTPS
        sameSite: 'none', // Adjust according to your needs
        maxAge: 24 * 60 * 60 * 1000 // Cookie expiration time (24 hours)
    });

    res.status(200).json({ message: 'Login successful' });
});

// Admin Registration
const AdminRegister = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json(new ApiResponse(400, null, "Email and password are required"));
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(400).json(new ApiResponse(400, null, "Admin is already registered"));
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
        email,
        password: hashedPassword,
    });

    // Generate a token
    const token = jwt.sign({ id: newAdmin._id }, process.env.ACCESS_TOKEN, { expiresIn: '24h' });

    // Set the cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json(new ApiResponse(200, { message: "Admin registered successfully" }));
});




const AdminCheck = asyncHandler(async(req,res) =>{
    const admin = await Admin.findOne() 
    if(admin){
        res.json({exist : true})
    }else{
        res.json({exist : false})
    }
})

export {AdminLogin ,AdminCheck , AdminRegister}