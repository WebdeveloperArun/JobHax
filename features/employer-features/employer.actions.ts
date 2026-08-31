"use server";
import { db } from "@/src/config/db";
import { getCurrentUser } from "../auth/server/auth.queries";
import { postJobType, PostJobType, updateCompanyProfileData, UpdateCompanyProfileData } from "./employer.schema";
import { employers, jobs, users } from "@/src/drizzle/schema";
import { eq } from "drizzle-orm";


export const updateEmployerProfile = async (data: UpdateCompanyProfileData) => {
    try {
        const { data: validatedData, error } = updateCompanyProfileData.safeParse(data);
        if (error) return { status: "ERROR", message: error.issues[0].message };

        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "employer") {
            return { status: "ERROR", message: "Unauthorized" };
        }
        const { avatarUrl, ...rest } = validatedData;
        if (avatarUrl != currentUser.avatarUrl) {
            await db.update(users).set({ avatarUrl }).where(eq(users.id, currentUser.id));
        }
        await db.update(employers).set(rest).where(eq(employers.id, currentUser.id));
        return { status: "SUCCESS", message: "Company profile updated successfully" };
    } catch (error) {
        return { status: "ERROR", message: "Failed to update company profile" };
    }
}

export const postJob = async (data: PostJobType) => {
    try {
        const { data: validatedData, error } = postJobType.safeParse(data);
        if (error) return { status: "ERROR", message: error.issues[0].message };

        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "employer") {
            return { status: "ERROR", message: "Unauthorized" };
        }

        await db.insert(jobs).values({ ...validatedData, employerId: currentUser.id });
        return { status: "SUCCESS", message: "Job posted successfully" };
    } catch (error) {
        return { status: "ERROR", message: "Failed to post a job" };
    }
}