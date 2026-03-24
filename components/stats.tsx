import { Briefcase, Building2, Users, Award } from "lucide-react"

const stats = [
  {
    icon: Briefcase,
    value: "10,000+",
    label: "Active Jobs",
  },
  {
    icon: Building2,
    value: "2,500+",
    label: "Companies",
  },
  {
    icon: Users,
    value: "50,000+",
    label: "Candidates",
  },
  {
    icon: Award,
    value: "15,000+",
    label: "Jobs Filled",
  },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
