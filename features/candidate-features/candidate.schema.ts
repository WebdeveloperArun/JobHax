import { z } from "zod";

// 1. Update Applicant Profile
export const updateApplicantProfileSchema = z.object({
    biography: z.string().max(2000).optional().or(z.literal("")),
    dateOfBirth: z.string().optional().or(z.literal("")), // ISO date string
    nationality: z.string().max(100).optional().or(z.literal("")),
    maritalStatus: z.enum(["single", "married", "divorced"]).optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    education: z.enum(["none", "high school", "undergraduate", "masters", "phd"]).optional(),
    experience: z.string().max(5000).optional().or(z.literal("")),
    websiteUrl: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
    location: z.string().max(255).optional().or(z.literal("")),
    avatarUrl: z.string().optional(),
    metadata: z.object({
        title: z.string().max(255).optional().or(z.literal("")),
        skills: z.array(z.string()).optional(),
        linkedinUrl: z.string().optional().or(z.literal("")),
        githubUrl: z.string().optional().or(z.literal("")),
        portfolioUrl: z.string().optional().or(z.literal("")),
        resumeUrl: z.string().optional().or(z.literal("")),
        experienceEntries: z.array(z.object({
            title: z.string(),
            company: z.string(),
            location: z.string().optional(),
            startDate: z.string(),
            endDate: z.string().optional(),
            description: z.string().optional(),
        })).optional(),
        educationEntries: z.array(z.object({
            degree: z.string(),
            school: z.string(),
            location: z.string().optional(),
            startDate: z.string(),
            endDate: z.string().optional(),
        })).optional(),
    }).optional(),
});

export type UpdateApplicantProfileData = z.infer<typeof updateApplicantProfileSchema>;

// 2. Update Candidate Account (name, username, email, phone)
export const updateCandidateAccountSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(255),
    userName: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(255)
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            "Username can only contain letters, numbers, underscores, and hyphens",
        ),
    email: z.string().trim().email("Enter a valid email").max(255).toLowerCase(),
    phoneNumber: z.string().trim().max(255).optional().or(z.literal("")),
});

export type UpdateCandidateAccountData = z.infer<typeof updateCandidateAccountSchema>;

// 3. Change Candidate Password
export const changeCandidatePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one lowercase letter, one uppercase letter, and one number",
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type ChangeCandidatePasswordData = z.infer<typeof changeCandidatePasswordSchema>;

// 4. Apply to Job
export const applyToJobSchema = z.object({
    jobId: z.coerce.number().int().positive(),
    coverLetter: z.string().max(4000).optional().or(z.literal("")),
    resumeUrl: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
    portfolioUrl: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
    linkedinUrl: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
});

export type ApplyToJobData = z.infer<typeof applyToJobSchema>;

// 5. Send Candidate Message
export const sendCandidateMessageSchema = z.object({
    conversationId: z.coerce.number().int().positive(),
    body: z.string().trim().min(1, "Message cannot be empty").max(4000, "Message is too long"),
});

export type SendCandidateMessageData = z.infer<typeof sendCandidateMessageSchema>;

// 6. Applicant Notification Preferences
export const applicantNotificationPreferencesSchema = z.object({
    jobMatches: z.boolean(),
    applicationUpdates: z.boolean(),
    interviewReminders: z.boolean(),
    profileViews: z.boolean(),
    marketingEmails: z.boolean(),
});

export type ApplicantNotificationPreferencesData = z.infer<typeof applicantNotificationPreferencesSchema>;

// 7. Applicant Privacy Settings
export const applicantPrivacySettingsSchema = z.object({
    profileVisible: z.boolean(),
    showContactInfo: z.boolean(),
    openToWork: z.boolean(),
});

export type ApplicantPrivacySettingsData = z.infer<typeof applicantPrivacySettingsSchema>;
