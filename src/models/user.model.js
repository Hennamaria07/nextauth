import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        pasword: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    }
)

//next js uses it's work in edge computing
//it doesn't konw that it is coonected already to mdb or not

//if the model is already created then do this mongoose.model.users this will gave the model refernce
const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;