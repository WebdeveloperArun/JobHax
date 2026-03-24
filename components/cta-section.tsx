import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="bg-primary py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
          Ready to Take the Next Step?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80 leading-relaxed text-pretty">
          Join thousands of professionals who have found their dream jobs through JobHax. 
          Create your free account today and start your journey.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register" className="gap-2">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <Link href="/jobs">
              Browse Jobs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
