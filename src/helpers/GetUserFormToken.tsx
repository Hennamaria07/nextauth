import { throws } from "assert";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getUserFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        console.log('extacted token--->', token);
        const decodedToken: any = jwt.verify(token, "dwffdhbvdfnvfdnvjvtbhervndv");
        return decodedToken._id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}