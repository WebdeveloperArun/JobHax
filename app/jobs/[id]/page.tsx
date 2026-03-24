"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Bookmark,
  Share2,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  CheckCircle,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

const jobData = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$120,000 - $180,000",
  tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
  posted: "2 days ago",
  deadline: "March 30, 2026",
  logo: "T",
  featured: true,
  description: `We're looking for a Senior Frontend Developer to join our growing team and help build the next generation of our product. You'll work closely with designers, product managers, and backend engineers to deliver exceptional user experiences.

As a Senior Frontend Developer, you'll take ownership of our frontend architecture and help mentor junior developers. This is an opportunity to make a significant impact on a product used by millions of users worldwide.`,
  responsibilities: [
    "Lead the development of new features and improvements to our web application",
    "Write clean, maintainable, and well-tested code",
    "Collaborate with designers to implement pixel-perfect UI components",
    "Mentor junior developers and conduct code reviews",
    "Contribute to architectural decisions and technical strategy",
    "Optimize application performance and ensure accessibility",
    "Participate in agile ceremonies and contribute to sprint planning",
  ],
  requirements: [
    "5+ years of experience in frontend development",
    "Strong proficiency in React and TypeScript",
    "Experience with Next.js and server-side rendering",
    "Familiarity with modern CSS frameworks (Tailwind CSS preferred)",
    "Experience with GraphQL and REST APIs",
    "Strong understanding of web performance optimization",
    "Excellent communication and collaboration skills",
  ],
  benefits: [
    "Competitive salary and equity package",
    "Health, dental, and vision insurance",
    "Flexible work arrangements (remote-friendly)",
    "Unlimited PTO policy",
    "Professional development budget",
    "Home office setup allowance",
    "401(k) with company matching",
  ],
  companyInfo: {
    name: "TechCorp Inc.",
    size: "500-1000 employees",
    industry: "Technology",
    founded: "2015",
    description: "TechCorp Inc. is a leading technology company focused on building innovative solutions that help businesses scale. Our platform is used by over 10,000 companies worldwide.",
  },
}

const similarJobs = [
  {
    id: 2,
    title: "Frontend Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100k - $140k",
    logo: "S",
  },
  {
    id: 3,
    title: "React Developer",
    company: "WebAgency",
    location: "New York, NY",
    salary: "$90k - $120k",
    logo: "W",
  },
  {
    id: 4,
    title: "UI Developer",
    company: "DesignTech",
    location: "Austin, TX",
    salary: "$95k - $130k",
    logo: "D",
  },
]

export default function JobDetailsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/20">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl font-bold text-secondary-foreground">
                      {jobData.logo}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl font-bold text-foreground">
                              {jobData.title}
                            </h1>
                            {jobData.featured && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="mt-2 flex items-center gap-1 text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            <span className="font-medium">{jobData.company}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 shrink-0">
                          <Button variant="outline" size="icon">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {jobData.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {jobData.salary}
                        </span>
                        <Badge variant="outline">{jobData.type}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Posted {jobData.posted}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {jobData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {jobData.description}
                  </p>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {jobData.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {jobData.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {jobData.benefits.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                          <CheckCircle className="h-4 w-4 text-accent" />
                        </div>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/login">Apply for this Job</Link>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      You need to <Link href="/login" className="text-primary hover:underline">sign in</Link> or{" "}
                      <Link href="/register" className="text-primary hover:underline">create an account</Link> to apply
                    </p>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Application Deadline</p>
                        <p className="text-sm text-muted-foreground">{jobData.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Job Type</p>
                        <p className="text-sm text-muted-foreground">{jobData.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Experience</p>
                        <p className="text-sm text-muted-foreground">5+ years</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-lg font-bold">
                      {jobData.logo}
                    </div>
                    <div>
                      <p className="font-semibold">{jobData.companyInfo.name}</p>
                      <p className="text-sm text-muted-foreground">{jobData.companyInfo.industry}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {jobData.companyInfo.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{jobData.companyInfo.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Founded {jobData.companyInfo.founded}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    View Company Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Similar Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {similarJobs.map((job) => (
                    <Link 
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="block p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-bold">
                          {job.logo}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">{job.title}</p>
                          <p className="text-xs text-muted-foreground">{job.company}</p>
                          <p className="text-xs text-muted-foreground">{job.salary}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
