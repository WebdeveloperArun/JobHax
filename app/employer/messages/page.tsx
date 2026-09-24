import { getEmployerConversations } from "@/features/employer-features/employer.queries"
import { getCurrentUser } from "@/features/auth/server/auth.queries"
import { EmployerMessagesClient } from "./messages-client"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Messages | Employer Dashboard",
  description: "Manage candidate conversations",
}

export default async function EmployerMessagesPage() {
  const currentUser = await getCurrentUser()
  
  if (!currentUser || currentUser.role !== "employer") {
    redirect("/login")
  }

  // We fetch conversations here, since it's a server component.
  const conversations = await getEmployerConversations()

  // We need to fetch details so we can pass to client
  // Get full current user to pass down
  return (
    <EmployerMessagesClient 
      initialConversations={conversations} 
      currentUser={currentUser}
    />
  )
}
