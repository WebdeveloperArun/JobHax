"use server";

import { db } from "@/src/config/db";
import { users } from "@/src/drizzle/schema";
import argon2 from "argon2"


export const registrationAction = async (data: {
    name: string;
    userName: string;
    email: string;
    password: string;
    role: "applicant" | "employer";
}) => {
    try {
        const { name, userName, email, password, role } = data;
        const hashedPassword = await argon2.hash(password);
        await db.insert(users).values({ name, userName, email, password: hashedPassword, role });
        return {
            status: "SUCCESS",
            message: "User registered successfully"
        }
    } catch (error) {
        return {
            status: "ERROR",
            message: "Something went wrong"
        }
    }
}