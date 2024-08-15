import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {Admin} from "../models/AdminLogin.model.js"

const AdminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: 'Invalid username' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate the token
        const token = jwt.sign({ id: admin._id }, process.env.ACCESS_TOKEN, { expiresIn: '24h' });

        // Save token in the database
        admin.accessToken = token;
        await admin.save();  // Save the updated admin record

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


const AdminRegister = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json(new ApiResponse(400, null, "Email is required"));
    }
    if (!password) {
        return res.status(400).json(new ApiResponse(400, null, "Password is required"));
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
        return res.status(400).json(new ApiResponse(400, null, "Admin is already registered"));
    }

    const newAdmin = await Admin.create({
        email,
        password
    });

    // Generate a token
    const token = jwt.sign({ id: newAdmin._id }, process.env.ACCESS_TOKEN, { expiresIn: '24h' });

    // Save token in the database
    newAdmin.accessToken = token;
    await newAdmin.save();  // Save the updated admin record

    return res.status(200).json(new ApiResponse(200, { token }, "Admin registered successfully"));
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