import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const GET = (request: NextRequest) => {
    try {
       const response = NextResponse.json(
            {
                message: "Logout successfully",
                success: true
            },
            {
                status: 200
            }
        )
        console.log(response)
       response.cookies.set("token", "", 
            {
                httpOnly: true
            }
        )
        return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export default GET;