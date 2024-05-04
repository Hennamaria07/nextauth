import { z } from "zod";

export const usernameValidation = z.string().min(2, "username must be atleast 2 characters").max(20, "must be no more than 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username should not contain any special character");

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password atleast 6 characters"})
})