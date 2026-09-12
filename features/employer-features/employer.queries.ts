import { db } from "@/src/config/db";
import { employers, jobs } from "@/src/drizzle/schema";
import { getCurrentUser } from "../auth/server/auth.queries";
import { eq, desc } from "drizzle-orm";

export const getCurrentEmployerDetails = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    if (currentUser.role !== "employer") return null;

    const [employer] = await db
        .select()
        .from(employers)
        .where(eq(employers.id, currentUser.id));

    const isProfileCompleted =
        employer?.name &&
        employer?.description &&
        employer?.industry &&
        employer?.teamSize &&
        employer?.websiteUrl &&
        employer?.location &&
        employer?.yearOfEstablishment;

    return { ...currentUser, employerDetails: employer, isProfileCompleted };
};

export const getEmployerJobs = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "employer") return [];

    const employerJobs = await db
        .select()
        .from(jobs)
        .where(eq(jobs.employerId, currentUser.id))
        .orderBy(desc(jobs.createdAt));

    return employerJobs;
};