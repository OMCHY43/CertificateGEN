import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/AdminLogin.model.js";

// Admin Login
const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
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
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Adjust based on environment
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin Registration
const AdminRegister = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({ email, password: hashedPassword });

    // Generate a token
    const token = jwt.sign({ id: newAdmin._id }, process.env.ACCESS_TOKEN, { expiresIn: '24h' });

    // Set the cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ,
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Admin registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Check if admin exists
const AdminCheck = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (admin) {
      return res.json({ exist: true });
    }
    res.json({ exist: false });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { AdminLogin, AdminCheck, AdminRegister };
