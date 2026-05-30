import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Username is required"]
    },
    chatTitle:{
        type:String,
        default:"New Chat",
        required:[true,"chat title is required"],
        trim:true
        
    }
},{
    timestamps:true
});


const chatModel = mongoose.model("Chat",chatSchema);

export default chatModel