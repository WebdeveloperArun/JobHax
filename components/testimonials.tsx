import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "JobHax helped me find my dream job in just two weeks. The platform is intuitive and the job matches were spot on!",
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "TechCorp",
    avatar: "SJ",
  },
  {
    quote: "As an employer, I found the perfect candidates quickly. The quality of applicants exceeded my expectations.",
    name: "Michael Chen",
    role: "HR Director",
    company: "GrowthLabs",
    avatar: "MC",
  },
  {
    quote: "The best job platform I've used. Clean interface, great job recommendations, and excellent support team.",
    name: "Emily Rodriguez",
    role: "Product Designer",
    company: "DesignHub",
    avatar: "ER",
  },
]

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">What People Say</h2>
          <p className="mt-2 text-muted-foreground">
            Success stories from our community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="relative">
              <CardContent className="p-6">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />
                <p className="text-muted-foreground leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
