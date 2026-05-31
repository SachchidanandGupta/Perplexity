import { Router } from "express";
import {getMeUser, loginUser, registerUser, verifyEMail} from "../controllers/auth.controller.js"
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import authUser from "../middlewares/auth.middleware.js";

 const authRouter = Router();
 authRouter.post("/register",registerValidator,registerUser);
 authRouter.get("/verify-email",verifyEMail);
 authRouter.post("/login",loginValidator,loginUser);
 authRouter.get("/get-me",authUser,getMeUser)

 export default authRouter
