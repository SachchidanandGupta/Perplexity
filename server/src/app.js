import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // this line extract data from URL , the frontend on form submission send data in URL to read that we use app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use(errorHandler)

app.get("/",(req,res)=>{
    res.json({message:"Server is running"});
})

export default app;
