"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search,
  MapPin,
  Clock,
  Users,
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  Pause,
  Play,
  Copy,
  PlusCircle,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    applicants: 45,
    newApplicants: 8,
    views: 320,
    posted: "Mar 19, 2026",
    status: "active",
  },
  {
    id: 2,
    title: "Product Designer",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    applicants: 32,
    newApplicants: 5,
    views: 245,
    posted: "Mar 17, 2026",
    status: "active",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $150k",
    applicants: 28,
    newApplicants: 3,
    views: 180,
    posted: "Mar 10, 2026",
    status: "active",
  },
  {
    id: 4,
    title: "Marketing Manager",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$80k - $110k",
    applicants: 18,
    newApplicants: 0,
    views: 95,
    posted: "Feb 28, 2026",
    status: "paused",
  },
  {
    id: 5,
    title: "Data Analyst",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$70k - $95k",
    applicants: 52,
    newApplicants: 0,
    views: 420,
    posted: "Feb 15, 2026",
    status: "closed",
  },
]

const statusConfig = {
  active: { label: "Active", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  paused: { label: "Paused", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  closed: { label: "Closed", color: "bg-muted text-muted-foreground border-border" },
  draft: { label: "Draft", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
}

export default function EmployerJobsPage() {
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
              <h1 className="text-2xl font-bold text-foreground">Manage Jobs</h1>
              <p className="text-muted-foreground mt-1">
                View and manage all your job postings
              </p>
            </div>
            <Button asChild>
              <Link href="/employer/post-job">
                <PlusCircle className="h-4 w-4 mr-2" />
                Post New Job
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-4 mb-8">
            <Card className="bg-muted/30">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{jobs.length}</p>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
              </CardContent>
            </Card>
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {jobs.filter(j => j.status === "active").length}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {jobs.filter(j => j.status === "paused").length}
                </p>
                <p className="text-sm text-muted-foreground">Paused</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {jobs.reduce((acc, j) => acc + j.applicants, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Applicants</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search jobs..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="applicants">Most Applicants</SelectItem>
                <SelectItem value="views">Most Views</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({jobs.filter(j => j.status === "active").length})</TabsTrigger>
              <TabsTrigger value="paused">Paused ({jobs.filter(j => j.status === "paused").length})</TabsTrigger>
              <TabsTrigger value="closed">Closed ({jobs.filter(j => j.status === "closed").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {jobs.map((job) => {
                const status = statusConfig[job.status as keyof typeof statusConfig]
                return (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                            <Badge variant="outline" className={status.color}>
                              {status.label}
                            </Badge>
                            {job.newApplicants > 0 && (
                              <Badge className="bg-accent/10 text-accent border-accent/20">
                                +{job.newApplicants} new applicants
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <Badge variant="outline">{job.type}</Badge>
                            <span>{job.salary}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Posted {job.posted}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-foreground">{job.applicants}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                              <Users className="h-3 w-3" />
                              Applicants
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-foreground">{job.views}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                              <Eye className="h-3 w-3" />
                              Views
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href="/employer/candidates">
                                View Applicants
                              </Link>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Listing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit Job
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                {job.status === "active" ? (
                                  <DropdownMenuItem>
                                    <Pause className="h-4 w-4 mr-2" />
                                    Pause Job
                                  </DropdownMenuItem>
                                ) : job.status === "paused" ? (
                                  <DropdownMenuItem>
                                    <Play className="h-4 w-4 mr-2" />
                                    Resume Job
                                  </DropdownMenuItem>
                                ) : null}
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {jobs.filter(j => j.status === "active").map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.location} • {job.type} • {job.salary}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">{job.applicants} applicants</span>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="paused" className="space-y-4">
              {jobs.filter(j => j.status === "paused").map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow opacity-80">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.location} • {job.type} • {job.salary}
                        </p>
                      </div>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="closed" className="space-y-4">
              {jobs.filter(j => j.status === "closed").map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow opacity-60">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.location} • Closed • {job.applicants} total applicants
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Repost
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
