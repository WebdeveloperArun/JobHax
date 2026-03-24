"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search,
  MapPin,
  Briefcase,
  MoreVertical,
  Mail,
  Phone,
  FileText,
  Star,
  StarOff,
  CheckCircle,
  XCircle,
  Calendar,
  MessageSquare,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

const candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Frontend Developer",
    avatar: "SJ",
    location: "San Francisco, CA",
    experience: "5 years",
    appliedFor: "Senior Frontend Developer",
    appliedDate: "Mar 22, 2026",
    match: 95,
    status: "new",
    email: "sarah@email.com",
    phone: "+1 (555) 123-4567",
    skills: ["React", "TypeScript", "Next.js"],
    starred: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Full Stack Developer",
    avatar: "MC",
    location: "New York, NY",
    experience: "4 years",
    appliedFor: "Senior Frontend Developer",
    appliedDate: "Mar 21, 2026",
    match: 88,
    status: "screening",
    email: "michael@email.com",
    phone: "+1 (555) 234-5678",
    skills: ["React", "Node.js", "MongoDB"],
    starred: false,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Product Designer",
    avatar: "ER",
    location: "Austin, TX",
    experience: "6 years",
    appliedFor: "Product Designer",
    appliedDate: "Mar 20, 2026",
    match: 92,
    status: "interview",
    email: "emily@email.com",
    phone: "+1 (555) 345-6789",
    skills: ["Figma", "UI/UX", "Prototyping"],
    starred: true,
  },
  {
    id: 4,
    name: "David Kim",
    title: "DevOps Engineer",
    avatar: "DK",
    location: "Seattle, WA",
    experience: "3 years",
    appliedFor: "DevOps Engineer",
    appliedDate: "Mar 19, 2026",
    match: 85,
    status: "new",
    email: "david@email.com",
    phone: "+1 (555) 456-7890",
    skills: ["AWS", "Kubernetes", "Docker"],
    starred: false,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "Backend Engineer",
    avatar: "LT",
    location: "Remote",
    experience: "7 years",
    appliedFor: "Senior Frontend Developer",
    appliedDate: "Mar 18, 2026",
    match: 75,
    status: "rejected",
    email: "lisa@email.com",
    phone: "+1 (555) 567-8901",
    skills: ["Python", "Django", "PostgreSQL"],
    starred: false,
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Software Engineer",
    avatar: "JW",
    location: "Chicago, IL",
    experience: "5 years",
    appliedFor: "Senior Frontend Developer",
    appliedDate: "Mar 17, 2026",
    match: 90,
    status: "offered",
    email: "james@email.com",
    phone: "+1 (555) 678-9012",
    skills: ["React", "TypeScript", "GraphQL"],
    starred: true,
  },
]

const statusConfig = {
  new: { label: "New", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  screening: { label: "Screening", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  interview: { label: "Interview", color: "bg-primary/10 text-primary border-primary/20" },
  offered: { label: "Offered", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  rejected: { label: "Rejected", color: "bg-red-500/10 text-red-600 border-red-500/20" },
}

export default function EmployerCandidatesPage() {
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Candidates</h1>
            <p className="text-muted-foreground mt-1">
              Review and manage job applicants
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search candidates..." className="pl-10" />
            </div>
            <Select defaultValue="all-jobs">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-jobs">All Jobs</SelectItem>
                <SelectItem value="frontend">Senior Frontend Developer</SelectItem>
                <SelectItem value="designer">Product Designer</SelectItem>
                <SelectItem value="devops">DevOps Engineer</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="match">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All ({candidates.length})</TabsTrigger>
              <TabsTrigger value="starred">Starred ({candidates.filter(c => c.starred).length})</TabsTrigger>
              <TabsTrigger value="new">New ({candidates.filter(c => c.status === "new").length})</TabsTrigger>
              <TabsTrigger value="interview">Interview ({candidates.filter(c => c.status === "interview").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {candidates.map((candidate) => {
                const status = statusConfig[candidate.status as keyof typeof statusConfig]
                return (
                  <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="h-14 w-14">
                            <AvatarFallback className="bg-primary/10 text-primary text-lg">
                              {candidate.avatar}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-lg text-foreground">
                                {candidate.name}
                              </h3>
                              <button className="text-yellow-500 hover:text-yellow-600">
                                {candidate.starred ? (
                                  <Star className="h-5 w-5 fill-current" />
                                ) : (
                                  <StarOff className="h-5 w-5" />
                                )}
                              </button>
                              <Badge variant="outline" className={status.color}>
                                {status.label}
                              </Badge>
                            </div>
                            
                            <p className="text-muted-foreground">{candidate.title}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {candidate.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {candidate.experience} experience
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              {candidate.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <p className="text-sm text-muted-foreground mt-3">
                              Applied for: <span className="font-medium text-foreground">{candidate.appliedFor}</span>
                              <span className="mx-2">•</span>
                              {candidate.appliedDate}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-accent">{candidate.match}%</div>
                            <p className="text-xs text-muted-foreground">Match Score</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Resume
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
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
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Phone className="h-4 w-4 mr-2" />
                                  Call Candidate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Schedule Interview
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Move to Next Stage
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
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

            <TabsContent value="starred" className="space-y-4">
              {candidates.filter(c => c.starred).map((candidate) => (
                <Card key={candidate.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {candidate.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{candidate.title}</p>
                      </div>
                      <div className="text-accent font-bold">{candidate.match}% match</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="new" className="space-y-4">
              {candidates.filter(c => c.status === "new").map((candidate) => (
                <Card key={candidate.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {candidate.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{candidate.title} • {candidate.appliedFor}</p>
                      </div>
                      <Button size="sm">Review</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="interview" className="space-y-4">
              {candidates.filter(c => c.status === "interview").map((candidate) => (
                <Card key={candidate.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {candidate.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{candidate.title}</p>
                      </div>
                      <Button size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
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
