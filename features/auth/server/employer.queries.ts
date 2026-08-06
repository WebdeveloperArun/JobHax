import { db } from "@/src/config/db";
import { employers } from "@/src/drizzle/schema";
import { getCurrentUser } from "./auth.queries";
import { eq } from "drizzle-orm";

export const getCurrentEmployerDetails = async () => {
    const currentUser = await getCurrentUser();

    console.log("currentUser: ", currentUser);

    if (!currentUser) return null;

    if (currentUser.role !== "employer") return null;

    const [employer] = await db
        .select()
        .from(employers)
        .where(eq(employers.id, currentUser.id));

    console.log("employer: ", employer);

    const isProfileCompleted =
        employer.name &&
        employer.description &&
        currentUser.avatarUrl &&
        employer.organizationType &&
        employer.yearOfEstablishment;

    return { ...currentUser, employerDetails: employer, isProfileCompleted };
};