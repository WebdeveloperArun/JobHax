import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Briefcase, 
  FileText, 
  Eye, 
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  ArrowRight,
  Building2,
  MapPin
} from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Applications Sent", value: 24, icon: FileText, change: "+3 this week" },
  { label: "Profile Views", value: 142, icon: Eye, change: "+18 this week" },
  { label: "Jobs Saved", value: 12, icon: Briefcase, change: "+2 this week" },
  { label: "Interviews", value: 5, icon: CheckCircle, change: "+1 this week" },
]

const recentApplications = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    status: "under_review",
    appliedDate: "Mar 20, 2026",
    logo: "T",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    status: "interview",
    appliedDate: "Mar 18, 2026",
    logo: "S",
  },
  {
    id: 3,
    title: "React Developer",
    company: "DesignHub",
    location: "New York, NY",
    status: "pending",
    appliedDate: "Mar 15, 2026",
    logo: "D",
  },
  {
    id: 4,
    title: "UI Developer",
    company: "WebAgency",
    location: "Austin, TX",
    status: "rejected",
    appliedDate: "Mar 10, 2026",
    logo: "W",
  },
]

const recommendedJobs = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "CloudScale",
    location: "Seattle, WA",
    salary: "$110k - $150k",
    match: 95,
    logo: "C",
  },
  {
    id: 2,
    title: "React Native Developer",
    company: "AppWorks",
    location: "Remote",
    salary: "$100k - $140k",
    match: 88,
    logo: "A",
  },
  {
    id: 3,
    title: "Senior UI Engineer",
    company: "DataFlow",
    location: "Denver, CO",
    salary: "$120k - $160k",
    match: 82,
    logo: "D",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-600", icon: Clock },
  under_review: { label: "Under Review", color: "bg-blue-500/10 text-blue-600", icon: Eye },
  interview: { label: "Interview", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-500/10 text-red-600", icon: XCircle },
}

export default function CandidateDashboard() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar 
        userType="candidate" 
        userName="John Doe" 
        userEmail="john@example.com" 
      />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Welcome back, John!</h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s what&apos;s happening with your job search
            </p>
          </div>

          {/* Profile Completion */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    A complete profile increases your chances of getting hired by 3x
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <Progress value={75} className="flex-1 h-2" />
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/candidate/profile">
                    Complete Profile
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

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
            {/* Recent Applications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Applications</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/candidate/applications">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => {
                    const status = statusConfig[app.status as keyof typeof statusConfig]
                    return (
                      <div key={app.id} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-bold">
                          {app.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{app.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="h-3 w-3" />
                            <span className="truncate">{app.company}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <Badge className={status.color}>
                            {status.label}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{app.appliedDate}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Jobs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recommended for You</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div key={job.id} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-bold">
                        {job.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{job.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          <span className="truncate">{job.company}</span>
                          <span className="text-muted-foreground">•</span>
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{job.salary}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-medium text-accent">{job.match}% match</div>
                        <Button size="sm" variant="outline" className="mt-1" asChild>
                          <Link href="/login">Apply</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
