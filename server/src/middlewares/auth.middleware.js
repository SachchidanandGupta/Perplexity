import jwt from "jsonwebtoken";
import appError from "../utils/appError.js";

async function authUser(req,res,next){
    const token = req.cookies.token;
    if(!token){
        throw new appError("token not provided",401,"Unauthorized");
    }
    let decoded;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(err){
        throw new appError("Invalid token",401," Invalid credentials");
    }
}

export default authUser