import dbConnection from "@/dbConfig/dbConnection";
import User from "@/models/user.model";
import { error } from "console";
import {NextRequest, NextResponse} from "next/server";

dbConnection();

export const POST = async (request: NextRequest) => {
    try {
        const {token} = await request.json();
        console.log(token);
        if(!token) {
            return NextResponse.json(
                {
                    error: "Unable to get the token",
                    success: false
                },
                {
                    status: 400
                }
            )
        }
        // console.log('token in verify->', token)
        const user = await User.findOne(
            {
                verifyToken: token,
                // verifyTokenExpiry: { $gt: Date.now() }
            }
        )
        if(!user) {
            return NextResponse.json(
                {
                    error: "Invalid token",
                    success: false
                },
                {
                    status: 400
                }
            )
        }
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        user.isVerified = true;
        await user.save();
        return NextResponse.json(
            {
                message: "Email verified successfully",
                success: true
            },
            {
                status: 200
            }
        )
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}