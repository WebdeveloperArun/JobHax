"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Bookmark,
  Trash2
} from "lucide-react"
import Link from "next/link"

const savedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    tags: ["React", "TypeScript", "Next.js"],
    posted: "2 days ago",
    savedDate: "Mar 22, 2026",
    logo: "T",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    tags: ["Figma", "UI/UX", "Prototyping"],
    posted: "1 day ago",
    savedDate: "Mar 21, 2026",
    logo: "D",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataFlow",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$130k - $170k",
    tags: ["Python", "ML", "SQL"],
    posted: "4 days ago",
    savedDate: "Mar 20, 2026",
    logo: "D",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$110k - $150k",
    tags: ["AWS", "Kubernetes", "CI/CD"],
    posted: "1 day ago",
    savedDate: "Mar 19, 2026",
    logo: "C",
  },
]

export default function SavedJobsPage() {
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
            <h1 className="text-2xl font-bold text-foreground">Saved Jobs</h1>
            <p className="text-muted-foreground mt-1">
              Jobs you&apos;ve bookmarked for later
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search saved jobs..." className="pl-10" />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 mb-6">
            <Bookmark className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">
              You have <span className="font-semibold text-foreground">{savedJobs.length}</span> saved jobs
            </span>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-xl font-bold">
                      {job.logo}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                          </h3>
                          <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Remove from saved</span>
                        </Button>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </span>
                        <Badge variant="outline">{job.type}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Posted {job.posted}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <span className="text-sm text-muted-foreground">
                          Saved on {job.savedDate}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" asChild>
                            <Link href={`/jobs/${job.id}`}>View Details</Link>
                          </Button>
                          <Button asChild>
                            <Link href="/login">Apply Now</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {savedJobs.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No saved jobs yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start browsing jobs and save the ones you&apos;re interested in
                </p>
                <Button asChild>
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
