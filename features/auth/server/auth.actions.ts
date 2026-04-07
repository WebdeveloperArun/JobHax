"use server";

import { db } from "@/src/config/db";
import { users } from "@/src/drizzle/schema";
import argon2 from "argon2"
import { eq, or } from "drizzle-orm";
import { LoginUserData, loginUserSchema, RegisterUserData, registerUserSchema } from "../auth.schema";
import { createSessionAndSetCookies } from "./use-cases/sessions";


export const registerUserAction = async (data: RegisterUserData) => {
    try {
        const { data: validatedData, error } = registerUserSchema.safeParse(data);
        if (error) return { status: "ERROR", message: error.issues[0].message };

        const { name, userName, email, password, role } = validatedData;
        const [user] = await db.select().from(users).where(or(eq(users.email, email), eq(users.userName, userName)));
        if (user) {
            if (user.email === email) return {
                status: "ERROR",
                message: "Email already exists"
            }
            else return {
                status: "ERROR",
                message: "Username already exists"
            }
        }
        const hashedPassword = await argon2.hash(password);
        const [result] = await db.insert(users).values({ name, userName, email, password: hashedPassword, role });
        await createSessionAndSetCookies(result.insertId);
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


export const loginUserAction = async (data: LoginUserData) => {
    try {
        const { data: validatedData, error } = loginUserSchema.safeParse(data);
        if (error) return { status: "ERROR", message: error.issues[0].message };

        const { email, password } = validatedData;
        const [user] = await db.select().from(users).where(eq(users.email, email));
        if (!user) {
            return {
                status: "ERROR",
                message: "User not found"
            }
        }
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return {
                status: "ERROR",
                message: "Invalid password"
            }
        }

        await createSessionAndSetCookies(user.id);

        return {
            status: "SUCCESS",
            message: "User logged in successfully"
        }
    } catch (error: any) {
        console.log(error)
        return {
            status: "ERROR",
            message: error.message
        }
    }
}