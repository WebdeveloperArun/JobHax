import { DashboardSidebar } from "@/components/dashboard-sidebar";
import EmployerForm from "@/components/employer-form";
import { getCurrentEmployerDetails } from "@/features/employer-features/employer.queries";

export default async function CompanyProfilePage() {
  const employer = await getCurrentEmployerDetails();
  
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar
        userType="employer"
        userName="TechCorp Inc."
        userEmail="hr@techcorp.com"
      />

      <EmployerForm employer={employer?.employerDetails} avatarUrl={employer?.avatarUrl}/>
    </div>
  );
}
