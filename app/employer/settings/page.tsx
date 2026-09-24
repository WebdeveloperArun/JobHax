import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { EmployerSettings } from "@/components/employer-settings";
import { getEmployerSettingsData } from "@/features/employer-features/employer.queries";
import { redirect } from "next/navigation";

export default async function EmployerSettingsPage() {
  const settings = await getEmployerSettingsData();

  if (!settings) return redirect("/login");

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar
        userType="employer"
        userName={settings.account.name || settings.account.companyName || undefined}
        userEmail={settings.account.email}
      />
      <EmployerSettings
        account={settings.account}
        notifications={settings.notifications}
        plan={settings.plan}
      />
    </div>
  );
}
