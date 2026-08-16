"use server";
import { db } from "@/src/config/db";
import { getCurrentUser } from "../auth/server/auth.queries";
import { updateCompanyProfileData, UpdateCompanyProfileData } from "./employer.schema";
import { employers } from "@/src/drizzle/schema";
import { eq } from "drizzle-orm";


export const updateEmployerProfile = async (data: UpdateCompanyProfileData) => {
    try {
        const { data: validatedData, error } = updateCompanyProfileData.safeParse(data);
        if (error) return { status: "ERROR", message: error.issues[0].message };

        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "employer") {
            return { status: "ERROR", message: "Unauthorized" };
        }

        await db.update(employers).set(validatedData).where(eq(employers.id, currentUser.id));
        return { status: "SUCCESS", message: "Company profile updated successfully" };
    } catch (error) {
        return { status: "ERROR", message: "Failed to update company profile" };
    }
}