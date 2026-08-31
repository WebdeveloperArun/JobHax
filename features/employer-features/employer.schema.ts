import {z} from "zod";

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
    status: z.enum(["draft", "published", "closed"]).default("published"),
})

export type PostJobType = z.infer<typeof postJobType>