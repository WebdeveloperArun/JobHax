"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Bookmark,
  SlidersHorizontal,
  X
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const allJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    tags: ["React", "TypeScript", "Next.js"],
    posted: "2 days ago",
    logo: "T",
    featured: true,
    description: "We're looking for a Senior Frontend Developer to join our growing team...",
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
    logo: "D",
    featured: true,
    description: "Join our design team and help create beautiful user experiences...",
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "GrowthLabs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$80k - $110k",
    tags: ["SEO", "Content", "Analytics"],
    posted: "3 days ago",
    logo: "G",
    featured: false,
    description: "Lead our marketing efforts and drive business growth...",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataFlow",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$130k - $170k",
    tags: ["Python", "ML", "SQL"],
    posted: "4 days ago",
    logo: "D",
    featured: false,
    description: "Work with large datasets and build machine learning models...",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$110k - $150k",
    tags: ["AWS", "Kubernetes", "CI/CD"],
    posted: "1 day ago",
    logo: "C",
    featured: true,
    description: "Help us scale our infrastructure and improve deployment processes...",
  },
  {
    id: 6,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Contract",
    salary: "$100k - $140k",
    tags: ["Node.js", "React", "MongoDB"],
    posted: "5 days ago",
    logo: "S",
    featured: false,
    description: "Build end-to-end features for our growing platform...",
  },
  {
    id: 7,
    title: "UX Researcher",
    company: "UserFirst",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$85k - $115k",
    tags: ["Research", "Interviews", "Analysis"],
    posted: "2 days ago",
    logo: "U",
    featured: false,
    description: "Conduct user research to inform product decisions...",
  },
  {
    id: 8,
    title: "Backend Engineer",
    company: "APIFlow",
    location: "Denver, CO",
    type: "Full-time",
    salary: "$115k - $155k",
    tags: ["Go", "PostgreSQL", "gRPC"],
    posted: "3 days ago",
    logo: "A",
    featured: true,
    description: "Build robust and scalable backend services...",
  },
  {
    id: 9,
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$100k - $145k",
    tags: ["React Native", "iOS", "Android"],
    posted: "1 day ago",
    logo: "A",
    featured: false,
    description: "Create cross-platform mobile applications...",
  },
  {
    id: 10,
    title: "Project Manager",
    company: "Organize Pro",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$75k - $100k",
    tags: ["Agile", "Scrum", "JIRA"],
    posted: "4 days ago",
    logo: "O",
    featured: false,
    description: "Lead projects from conception to completion...",
  },
]

const jobTypes = ["Full-time", "Part-time", "Contract", "Remote", "Internship"]
const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Lead", "Executive"]
const industries = ["Technology", "Design", "Marketing", "Finance", "Healthcare", "Education"]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState([50])

  const toggleJobType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3">Job Type</h3>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={type} 
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleJobType(type)}
              />
              <Label htmlFor={type} className="text-sm text-muted-foreground cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Experience Level</h3>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox id={level} />
              <Label htmlFor={level} className="text-sm text-muted-foreground cursor-pointer">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Salary Range</h3>
        <div className="px-2">
          <Slider
            value={salaryRange}
            onValueChange={setSalaryRange}
            max={250}
            step={10}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$0k</span>
            <span className="font-medium text-foreground">${salaryRange[0]}k+</span>
            <span>$250k+</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Industry</h3>
        <div className="space-y-2">
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox id={industry} />
              <Label htmlFor={industry} className="text-sm text-muted-foreground cursor-pointer">
                {industry}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={() => {
        setSelectedTypes([])
        setSalaryRange([50])
      }}>
        <X className="h-4 w-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/20">
        {/* Search Header */}
        <div className="bg-card border-b border-border py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-input bg-background px-4 py-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Job title, keywords, or company" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-input bg-background px-4 py-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="City, state, or remote" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 bg-transparent p-0 focus-visible:ring-0"
                />
              </div>
              <Button size="lg" className="md:w-auto">
                Search Jobs
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Available Jobs</h1>
              <p className="text-muted-foreground mt-1">
                Showing {allJobs.length} results
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Jobs</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              <Select defaultValue="relevant">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold text-lg text-foreground mb-4">Filters</h2>
                  <FilterSidebar />
                </CardContent>
              </Card>
            </aside>

            {/* Job Listings */}
            <div className="flex-1 space-y-4">
              {allJobs.map((job) => (
                <Card 
                  key={job.id} 
                  className={`group transition-all hover:shadow-md ${job.featured ? 'border-primary/30 bg-primary/5' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-xl font-bold text-secondary-foreground">
                        {job.logo}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                                {job.title}
                              </h3>
                              {job.featured && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                              <Building2 className="h-4 w-4" />
                              <span>{job.company}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <Bookmark className="h-5 w-5" />
                            <span className="sr-only">Save job</span>
                          </Button>
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {job.description}
                        </p>

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
                            {job.posted}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                          <Button asChild>
                            <Link href="/login">Apply Now</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={`/jobs/${job.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 pt-6">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <span className="px-2 text-muted-foreground">...</span>
                <Button variant="outline">10</Button>
                <Button variant="outline">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
