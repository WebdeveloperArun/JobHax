import { z } from "zod";

export const companyProfileData = z.object({
    companyName: z.string().min(2, "Company name is required"),
    tagline: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    industry: z.string().min(1, "Please select an industry"),
    teamSize: z.string().min(1, "Please select company size"),
    avatarUrl: z.string().optional(),
    yearOfEstablishment: z.coerce.number().min(1800).max(new Date().getFullYear()),
    location: z.string().min(2, "Location is required"),
    websiteUrl: z.string().url("Enter a valid URL").or(z.literal("")),
    linkedinUrl: z.string().optional(),
    twitterUrl: z.string().optional(),
    culture: z.string().optional(),
    benefits: z.string().optional(),
})

export const updateCompanyProfileData = z.object({
    name: z.string().min(2, "Company name is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    industry: z.string().min(1, "Please select an industry"),
    teamSize: z.string().min(1, "Please select company size"),
    avatarUrl: z.string().optional(),
    yearOfEstablishment: z.coerce.number().min(1800).max(new Date().getFullYear()),
    location: z.string().min(2, "Location is required"),
    websiteUrl: z.string().url("Enter a valid URL").or(z.literal("")),
    metadata: z.object({
        tagline: z.string().optional(),
        socialLinks: z.object({
            linkedin: z.string().optional(),
            twitter: z.string().optional(),
        }).optional(),
        culture: z.string().optional(),
        benefits: z.string().optional(),
    }),
})

export type CompanyProfileData = z.infer<typeof companyProfileData>
export type UpdateCompanyProfileData = z.infer<typeof updateCompanyProfileData>

export const updateEmployerAccountSchema = z.object({
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
})

export type UpdateEmployerAccountData = z.infer<typeof updateEmployerAccountSchema>

export const changeEmployerPasswordSchema = z
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
    })

export type ChangeEmployerPasswordData = z.infer<typeof changeEmployerPasswordSchema>

export const employerNotificationPreferencesSchema = z.object({
    newApplications: z.boolean(),
    applicationUpdates: z.boolean(),
    weeklyReports: z.boolean(),
    productUpdates: z.boolean(),
})

export type EmployerNotificationPreferencesData = z.infer<
    typeof employerNotificationPreferencesSchema
>

export const postJobType = z.object({
    title: z.string().max(255),
    department: z.enum([
        "engineering",
        "design",
        "marketing",
        "sales",
        "hr",
        "finance",
    ]),
    employmentType: z.enum([
        "full-time",
        "part-time",
        "contract",
        "internship",
    ]),
    location: z.string().max(255),
    workplaceType: z.enum([
        "onsite",
        "remote",
        "hybrid",
    ]),
    salaryMin: z.number().min(0),
    salaryMax: z.number().min(0),
    experienceLevel: z.enum([
        "entry",
        "mid",
        "senior",
        "lead",
        "executive",
    ]),
    description: z.string(),
    requirements: z.string().optional(),
    benefits: z.string().optional(),
    skills: z.array(z.string()),
    isFeatured: z.boolean().default(false),
    isUrgent: z.boolean().default(false),
    notifyCandidates: z.boolean().default(true),
    status: z.enum(["draft", "published", "paused", "closed"]).default("published"),
})

export type PostJobType = z.infer<typeof postJobType>

export const sendEmployerMessageSchema = z.object({
    conversationId: z.coerce.number().int().positive(),
    body: z.string().trim().min(1, "Message cannot be empty").max(4000, "Message is too long"),
})

export type SendEmployerMessageData = z.infer<typeof sendEmployerMessageSchema>

export const startEmployerConversationSchema = z.object({
    applicationId: z.coerce.number().int().positive(),
    body: z
        .string()
        .trim()
        .max(4000, "Message is too long")
        .optional()
        .or(z.literal("")),
})

export type StartEmployerConversationData = z.infer<typeof startEmployerConversationSchema>