import {asyncHandler} from "../utils/asyncHandler.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {Admin} from "../models/AdminLogin.model.js"

const AdminLogin = asyncHandler(async(req,res)=>{

    const { username, password } = req.body;
    
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ message: 'Invalid username' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id },  process.env.ACCESS_TOKEN , { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
    
    
})

const AdminRegister = asyncHandler(async(req , res) =>{
    const {email , username} = req.body ;

    if(!email){
        res.json(new ApiResponse(400 , null , "email is required"))
    }
    if(!username){
        res.json(new ApiResponse(400 , null , "username is required"))
    }

    const existingAdmin = await Admin.findOne(email)

    if(existingAdmin){
        return res.json(new ApiResponse(400 , null , "admin is alredy register"))
    }

    const registerAdmin = await Admin.create({
        email , username
    })

    return res.json(new ApiResponse(200 , registerAdmin , "Admin Register successfully"))
})

const AdminCheck = asyncHandler(async(req,res) =>{
    const admin = await Admin.findOne() 
    if(admin){
        res.json({exist : true})
    }else{
        res.json({exist : false})
    }
})

export {AdminLogin ,AdminCheck , AdminRegister}