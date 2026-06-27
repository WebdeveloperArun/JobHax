import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";
import React from "react";

export default async function CandidateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();

    if (!user) return redirect("/login");

    if (user.role !== "applicant") return redirect("/employer");

    return children;
}
