import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import appError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendEmail } from "../services/mail.service.js";

export const registerUser = asyncHandler(async function (req,res) {
    const {username,email,password} = req.body;
    const isUserExits = await userModel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
    });
    if(isUserExits){
        throw new appError("User already exists.",400); 
    }
    const user = await userModel.create({
        username,
        email,
        hashPassword:password
    });
    
    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity",
        html:`
             <p>Hi ${username},</p>
             <p>thank you for registering at <strong>Perplexity</strong>,
        `
    })
    return res.status(201).json({
        user:{
            _id:user._id,
            username:user.username,
            email:user.email,
        },
        message:"User registered successfully",
        success:true,
        status:"success"
    })
})