import dbConnection from "@/dbConfig/dbConnection";
import { getUserFromToken } from "@/helpers/GetUserFormToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
try {
    const userId = await getUserFromToken(request);
    if(!userId) {
        return NextResponse.json({error: "invalid access token", success: false}, {status: 401})
    }
    const user = await User.findById(userId).select("-password");
    return NextResponse.json(
        {
            message: "User fetched",
            success: true,
            user
        },
        {
            status: 200
        }
    )
} catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
}
}