"use server";
import { db } from "@/src/config/db";
import { getCurrentUser } from "../auth/server/auth.queries";
import { postJobType, PostJobType, updateCompanyProfileData, UpdateCompanyProfileData } from "./employer.schema";
import { employers, jobs, users } from "@/src/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { getEmployerJobs } from "./employer.queries";


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

export const updateJobStatus = async (jobId: number, status: "draft" | "published" | "paused" | "closed") => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "employer") {
            return { status: "ERROR", message: "Unauthorized" };
        }

        const [job] = await db.select().from(jobs).where(and(eq(jobs.id, jobId), eq(jobs.employerId, currentUser.id)));
        if (!job) {
            return { status: "ERROR", message: "Job not found" };
        }

        await db.update(jobs).set({ status }).where(eq(jobs.id, jobId));
        return { status: "SUCCESS", message: `Job status updated to ${status}` };
    } catch (error) {
        return { status: "ERROR", message: "Failed to update job status" };
    }
}

export const deleteJob = async (jobId: number) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "employer") {
            return { status: "ERROR", message: "Unauthorized" };
        }

        const [job] = await db.select().from(jobs).where(and(eq(jobs.id, jobId), eq(jobs.employerId, currentUser.id)));
        if (!job) {
            return { status: "ERROR", message: "Job not found" };
        }

        await db.delete(jobs).where(eq(jobs.id, jobId));
        return { status: "SUCCESS", message: "Job deleted successfully" };
    } catch (error) {
        return { status: "ERROR", message: "Failed to delete job" };
    }
}

export const duplicateJob = async (jobId: number) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "employer") {
            return { status: "ERROR", message: "Unauthorized" };
        }

        const [existingJob] = await db.select().from(jobs).where(and(eq(jobs.id, jobId), eq(jobs.employerId, currentUser.id)));
        if (!existingJob) {
            return { status: "ERROR", message: "Job not found" };
        }

        const { id, createdAt, updatedAt, ...rest } = existingJob;
        await db.insert(jobs).values({
            ...rest,
            title: `${existingJob.title} - Copy`,
            status: "draft"
        });

        return { status: "SUCCESS", message: "Job duplicated successfully as draft" };
    } catch (error) {
        return { status: "ERROR", message: "Failed to duplicate job" };
    }
}

export const updateJob = async (jobId: number, data: PostJobType) => {
    try {
        const { data: validatedData, error } = postJobType.safeParse(data);
        if (error) return { status: "ERROR", message: error.issues[0].message };

        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "employer") {
            return { status: "ERROR", message: "Unauthorized" };
        }

        const [job] = await db.select().from(jobs).where(and(eq(jobs.id, jobId), eq(jobs.employerId, currentUser.id)));
        if (!job) {
            return { status: "ERROR", message: "Job not found" };
        }

        await db.update(jobs).set(validatedData).where(eq(jobs.id, jobId));
        return { status: "SUCCESS", message: "Job updated successfully" };
    } catch (error) {
        return { status: "ERROR", message: "Failed to update job" };
    }
}

export const fetchEmployerJobsAction = async () => {
    try {
        const jobsList = await getEmployerJobs();
        return { status: "SUCCESS", data: jobsList };
    } catch (error) {
        return { status: "ERROR", message: "Failed to fetch jobs", data: [] };
    }
}