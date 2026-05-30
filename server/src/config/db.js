import mongoose from "mongoose";

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected with MongoDB Database");
    }).catch((err)=>{
        console.error("Connection failed",err.message);
        process.exit(1);
    })
}


export default connectToDB