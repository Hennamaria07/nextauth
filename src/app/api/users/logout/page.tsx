import dbConnection from "@/dbConfig/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        return NextResponse.json(
            {
                message: "Logout successfully",
                success: true
            },
            {
                status: 200
            }
        ).cookies.set("token", "", 
            {
                httpOnly: true,
                expires: new Date(0)
            }
        )
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}