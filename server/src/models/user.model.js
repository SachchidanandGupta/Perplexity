import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    hashPassword:{
        type:String,
        required:true,
        minLength:6,
        select:false
    },
    verified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});


userSchema.pre("save",async function () {
    if(!this.isModified("hashPassword")) return ;
    this.hashPassword = await bcrypt.hash(this.hashPassword,10);
    return;
})

userSchema.methods.comparePassword = async function (password){
    if(!this.hashPassword) return false;
   return bcrypt.compare(password,this.hashPassword);
}

const userModel = mongoose.model("User",userSchema);

export default userModel;