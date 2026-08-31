import { relations } from 'drizzle-orm';
import { int, mysqlTable, text, varchar, timestamp, mysqlEnum, date, year, json, serial, boolean } from 'drizzle-orm/mysql-core';

export type EmployerMetadata = {
    tagline?: string;
    culture?: string;
    benefits?: string;
    socialLinks?: {
        linkedin?: string;
        twitter?: string;
    },
};

export const users = mysqlTable('users', {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    userName: varchar("username", { length: 255 }).unique().notNull(),
    password: text("password").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    role: mysqlEnum("role", ["admin", "employer", "applicant"]).notNull(),
    phoneNumber: varchar("phone_number", { length: 255 }),
    avatarUrl: text("avatar_url"),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
});

export const sessions = mysqlTable('sessions', {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    userAgent: text("user_agent").notNull(),
    ip: varchar("ip", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
});

export const employers = mysqlTable("employers", {
    id: int("id")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 255 }),
    description: text("description"),
    industry: varchar("organization_type", { length: 100 }),
    teamSize: varchar("team_size", { length: 50 }),
    yearOfEstablishment: year("year_of_establishment"), // MySQL YEAR type
    websiteUrl: varchar("website_url", { length: 255 }),
    location: varchar("location", { length: 255 }),
    metadata: json("metadata").$type<EmployerMetadata>(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const applicants = mysqlTable("applicants", {
    id: int("id")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),

    biography: text("biography"),
    dateOfBirth: date("date_of_birth"),
    nationality: varchar("nationality", { length: 100 }),
    maritalStatus: mysqlEnum("marital_status", ["single", "married", "divorced"]),
    gender: mysqlEnum("gender", ["male", "female", "other"]),
    education: mysqlEnum("education", [
        "none",
        "high school",
        "undergraduate",
        "masters",
        "phd",
    ]),
    experience: text("experience"),
    websiteUrl: varchar("website_url", { length: 255 }),
    location: varchar("location", { length: 255 }),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});
// Relations definitions
export const usersRelations = relations(users, ({ one, many }) => ({
    // One user can have one employer profile (if role is employer)
    employer: one(employers, {
        fields: [users.id],
        references: [employers.id],
    }),
    // One user can have one applicant profile (if role is applicant)
    applicant: one(applicants, {
        fields: [users.id],
        references: [applicants.id],
    }),
    // One user can have many sessions
    sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    // Each session belongs to one user
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));


export const jobs = mysqlTable("jobs", {
    id: serial("id").primaryKey(),
    employerId: int("employer_id").notNull().references(() => employers.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    department: mysqlEnum("department", [
        "engineering",
        "design",
        "marketing",
        "sales",
        "hr",
        "finance",
    ]),
    employmentType: mysqlEnum("employment_type", [
        "full-time",
        "part-time",
        "contract",
        "internship",
    ]).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    workplaceType: mysqlEnum("workplace_type", [
        "onsite",
        "remote",
        "hybrid",
    ]),
    salaryMin: int("salary_min"),
    salaryMax: int("salary_max"),
    experienceLevel: mysqlEnum("experience_level", [
        "entry",
        "mid",
        "senior",
        "lead",
        "executive",
    ]),
    description: text("description").notNull(),
    requirements: text("requirements"),
    benefits: text("benefits"),
    skills: json("skills").$type<string[]>(),
    isFeatured: boolean("is_featured").default(false),
    isUrgent: boolean("is_urgent").default(false),
    notifyCandidates: boolean("notify_candidates").default(true),
    status: mysqlEnum("status", ["draft", "published", "closed"]).default("published"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});


export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;