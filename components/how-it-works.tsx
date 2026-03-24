import { UserPlus, Search, FileText, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up as a candidate or employer in just a few minutes.",
  },
  {
    icon: Search,
    title: "Search & Discover",
    description: "Browse through thousands of jobs or find the perfect candidates.",
  },
  {
    icon: FileText,
    title: "Apply or Post",
    description: "Submit your application or post a job listing easily.",
  },
  {
    icon: CheckCircle,
    title: "Get Hired",
    description: "Connect, interview, and land your dream job or perfect hire.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-secondary/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
          <p className="mt-2 text-muted-foreground">
            Get started in just 4 simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <step.icon className="h-8 w-8" />
              </div>
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {index + 1}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
