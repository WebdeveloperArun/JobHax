import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"

const featuredJobs = [
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
  },
]

export function FeaturedJobs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Featured Jobs</h2>
            <p className="mt-2 text-muted-foreground">
              Discover opportunities from top companies
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/jobs" className="gap-2">
              View All Jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <Card 
              key={job.id} 
              className={`group transition-all hover:shadow-md ${job.featured ? 'border-primary/30 bg-primary/5' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-lg font-bold text-secondary-foreground">
                    {job.logo}
                  </div>
                  {job.featured && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    {job.company}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
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
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {job.posted}
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/jobs/${job.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
