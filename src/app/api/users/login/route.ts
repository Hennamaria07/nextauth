import dbConnection from "@/dbConfig/dbConnection"
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

dbConnection();

export const POST = async (request: NextRequest) => {
    try {
        const {email, password} = await request.json();
        console.log(email, password)
        //validation
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({
                message: "User not found",
                success: false
            },
        {
            status: 404
        })
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword) {
            return NextResponse.json({
                message: "Check your credentials",
                success: false
            },
            {
                status: 401
            }
        )
        }
        const token = jwt.sign(
            {
                _id: user._id
            },
            "dwffdhbvdfnvfdnvjvtbhervndv",
            {
                expiresIn: "1d"
            }
        );
        console.log(token)
        const response = NextResponse.json(
            {
                message: "User loggin successfully",
                success: true,
                token
            },
            {
                status: 200
            }
        )
        response.cookies.set("token", token, {
            httpOnly: true
        });
        return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}