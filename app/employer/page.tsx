import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Briefcase, 
  Users, 
  Eye, 
  TrendingUp,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle,
  PlusCircle
} from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Active Jobs", value: 8, icon: Briefcase, change: "+2 this month" },
  { label: "Total Applicants", value: 156, icon: Users, change: "+24 this week" },
  { label: "Job Views", value: 2450, icon: Eye, change: "+340 this week" },
  { label: "Hired This Month", value: 3, icon: CheckCircle, change: "+1 this week" },
]

const activeJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    applicants: 45,
    newApplicants: 8,
    views: 320,
    posted: "5 days ago",
    status: "active",
  },
  {
    id: 2,
    title: "Product Designer",
    location: "Remote",
    type: "Full-time",
    applicants: 32,
    newApplicants: 5,
    views: 245,
    posted: "1 week ago",
    status: "active",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    location: "New York, NY",
    type: "Full-time",
    applicants: 28,
    newApplicants: 3,
    views: 180,
    posted: "2 weeks ago",
    status: "active",
  },
]

const recentApplicants = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    avatar: "SJ",
    experience: "5 years",
    appliedFor: "Senior Frontend Developer",
    appliedDate: "2 hours ago",
    match: 95,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Full Stack Developer",
    avatar: "MC",
    experience: "4 years",
    appliedFor: "Senior Frontend Developer",
    appliedDate: "5 hours ago",
    match: 88,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Designer",
    avatar: "ER",
    experience: "6 years",
    appliedFor: "Product Designer",
    appliedDate: "1 day ago",
    match: 92,
  },
  {
    id: 4,
    name: "David Kim",
    role: "DevOps Engineer",
    avatar: "DK",
    experience: "3 years",
    appliedFor: "DevOps Engineer",
    appliedDate: "1 day ago",
    match: 85,
  },
]

export default function EmployerDashboard() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar 
        userType="employer" 
        userName="TechCorp Inc." 
        userEmail="hr@techcorp.com" 
      />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, TechCorp!</h1>
              <p className="text-muted-foreground mt-1">
                Here&apos;s an overview of your recruitment activity
              </p>
            </div>
            <Button asChild>
              <Link href="/employer/post-job">
                <PlusCircle className="h-4 w-4 mr-2" />
                Post New Job
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-accent" />
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <p className="text-xs text-accent mt-2">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Active Jobs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Job Postings</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/employer/jobs">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <div key={job.id} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate">{job.title}</p>
                          {job.newApplicants > 0 && (
                            <Badge variant="secondary" className="bg-accent/10 text-accent">
                              +{job.newApplicants} new
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.posted}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-medium">{job.applicants} applicants</p>
                        <p className="text-xs text-muted-foreground">{job.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Applicants */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Applicants</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/employer/candidates">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplicants.map((applicant) => (
                    <div key={applicant.id} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {applicant.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{applicant.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {applicant.role} • {applicant.experience}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Applied for: {applicant.appliedFor}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-medium text-accent">{applicant.match}% match</div>
                        <p className="text-xs text-muted-foreground">{applicant.appliedDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/employer/post-job">
                    <PlusCircle className="h-6 w-6 text-primary" />
                    <span>Post New Job</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/employer/candidates">
                    <Users className="h-6 w-6 text-primary" />
                    <span>Browse Candidates</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/employer/jobs">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span>Manage Jobs</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/employer/analytics">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <span>View Analytics</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
