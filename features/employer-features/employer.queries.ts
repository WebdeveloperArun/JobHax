import { db } from "@/src/config/db";
import { employers } from "@/src/drizzle/schema";
import { getCurrentUser } from "../auth/server/auth.queries";
import { eq } from "drizzle-orm";

export const getCurrentEmployerDetails = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    if (currentUser.role !== "employer") return null;

    const [employer] = await db
        .select()
        .from(employers)
        .where(eq(employers.id, currentUser.id));

    const isProfileCompleted =
        employer.name &&
        employer.description &&
        employer.industry &&
        employer.teamSize &&
        employer.websiteUrl &&
        employer.location &&
        employer.yearOfEstablishment;

    return { ...currentUser, employerDetails: employer, isProfileCompleted };
};