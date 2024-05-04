import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
    {
        content: String,
        required: true
    },
    {
        timestamps: true
    }
)

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unquie: true,
            trim: true,
            lowerCase: true,
            required: true
        },
        email: {
            type: String,
            unquie: true,
            trim: true,
            lowerCase: true,
            required: true,
            match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, "Please provide a valid email address"]
        },
        password: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verifyCode: {
            type: String,
            required: true
        },
        verifyCodeExpiry: {
            type: Date,
            required: true
        },
        isAcceptingMessage: {
            type: Boolean,
            default: true
        },
        messages: [messageSchema]
    }
)

// In Next.js, when defining a model using Mongoose for a user, we check if the model already exists to prevent redefining it, ensuring we don't overwrite it unintentionally.

// n Next.js, which is a framework for server-rendered React applications, each request may trigger a new instance of the application, potentially leading to multiple attempts to define the same model. Therefore, in Next.js, it's crucial to check whether the model already exists to prevent redefinition.

const User = (mongoose.models.User) || (mongoose.model("User", userSchema));

export default User;