"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search,
  Building2,
  MapPin,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

const applications = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    status: "under_review",
    appliedDate: "Mar 20, 2026",
    salary: "$120k - $180k",
    logo: "T",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    status: "interview",
    appliedDate: "Mar 18, 2026",
    salary: "$100k - $140k",
    logo: "S",
    interviewDate: "Mar 25, 2026 at 2:00 PM",
  },
  {
    id: 3,
    title: "React Developer",
    company: "DesignHub",
    location: "New York, NY",
    status: "pending",
    appliedDate: "Mar 15, 2026",
    salary: "$90k - $130k",
    logo: "D",
  },
  {
    id: 4,
    title: "UI Developer",
    company: "WebAgency",
    location: "Austin, TX",
    status: "rejected",
    appliedDate: "Mar 10, 2026",
    salary: "$85k - $115k",
    logo: "W",
  },
  {
    id: 5,
    title: "Frontend Engineer",
    company: "CloudScale",
    location: "Seattle, WA",
    status: "offered",
    appliedDate: "Mar 8, 2026",
    salary: "$110k - $150k",
    logo: "C",
  },
  {
    id: 6,
    title: "JavaScript Developer",
    company: "DataFlow",
    location: "Denver, CO",
    status: "under_review",
    appliedDate: "Mar 5, 2026",
    salary: "$95k - $125k",
    logo: "D",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock },
  under_review: { label: "Under Review", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Eye },
  interview: { label: "Interview Scheduled", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: Calendar },
  offered: { label: "Offer Received", color: "bg-accent/10 text-accent border-accent/20", icon: CheckCircle },
  rejected: { label: "Not Selected", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
}

export default function CandidateApplicationsPage() {
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
            <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage all your job applications
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
            <Card className="bg-muted/30">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{applications.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter(a => a.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {applications.filter(a => a.status === "under_review").length}
                </p>
                <p className="text-sm text-muted-foreground">In Review</p>
              </CardContent>
            </Card>
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter(a => a.status === "interview").length}
                </p>
                <p className="text-sm text-muted-foreground">Interviews</p>
              </CardContent>
            </Card>
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-accent">
                  {applications.filter(a => a.status === "offered").length}
                </p>
                <p className="text-sm text-muted-foreground">Offers</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search applications..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="company">Company A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({applications.filter(a => !["rejected", "offered"].includes(a.status)).length})</TabsTrigger>
              <TabsTrigger value="archived">Archived ({applications.filter(a => ["rejected", "offered"].includes(a.status)).length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {applications.map((app) => {
                const status = statusConfig[app.status as keyof typeof statusConfig]
                const StatusIcon = status.icon
                return (
                  <Card key={app.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg font-bold">
                          {app.logo}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h3 className="font-semibold text-foreground">{app.title}</h3>
                            <Badge variant="outline" className={status.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {app.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {app.location}
                            </span>
                            <span>{app.salary}</span>
                          </div>
                          {app.status === "interview" && app.interviewDate && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                              <Calendar className="h-4 w-4" />
                              <span className="font-medium">Interview: {app.interviewDate}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col sm:items-end gap-2">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Applied {app.appliedDate}
                          </p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/jobs/${app.id}`}>
                                View Job
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                            {app.status === "offered" && (
                              <Button size="sm">View Offer</Button>
                            )}
                            {app.status === "interview" && (
                              <Button size="sm">Join Interview</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {applications.filter(a => !["rejected", "offered"].includes(a.status)).map((app) => {
                const status = statusConfig[app.status as keyof typeof statusConfig]
                const StatusIcon = status.icon
                return (
                  <Card key={app.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg font-bold">
                          {app.logo}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h3 className="font-semibold text-foreground">{app.title}</h3>
                            <Badge variant="outline" className={status.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {app.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {app.location}
                            </span>
                          </div>
                        </div>

                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/jobs/${app.id}`}>View Job</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="archived" className="space-y-4">
              {applications.filter(a => ["rejected", "offered"].includes(a.status)).map((app) => {
                const status = statusConfig[app.status as keyof typeof statusConfig]
                const StatusIcon = status.icon
                return (
                  <Card key={app.id} className="hover:shadow-md transition-shadow opacity-80">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg font-bold">
                          {app.logo}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h3 className="font-semibold text-foreground">{app.title}</h3>
                            <Badge variant="outline" className={status.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {app.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {app.location}
                            </span>
                          </div>
                        </div>

                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/jobs/${app.id}`}>View Job</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
