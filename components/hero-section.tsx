"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            Over 10,000+ jobs available
          </span>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Find Your Dream Job with{" "}
            <span className="text-primary">JobHax</span>
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
            Connect with top employers and discover opportunities that match your skills. 
            Your next career move starts here.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center rounded-xl bg-card p-3 shadow-lg border border-border max-w-2xl mx-auto">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-background px-4 py-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Job title or keyword" 
                className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-background px-4 py-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Location" 
                className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-muted-foreground"
              />
            </div>
            <Button size="lg" className="gap-2" asChild>
              <Link href="/jobs">
                Search Jobs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Popular:</span>
            <Link href="/jobs?q=developer" className="rounded-full bg-secondary px-3 py-1 transition-colors hover:bg-secondary/80">
              Developer
            </Link>
            <Link href="/jobs?q=designer" className="rounded-full bg-secondary px-3 py-1 transition-colors hover:bg-secondary/80">
              Designer
            </Link>
            <Link href="/jobs?q=marketing" className="rounded-full bg-secondary px-3 py-1 transition-colors hover:bg-secondary/80">
              Marketing
            </Link>
            <Link href="/jobs?q=sales" className="rounded-full bg-secondary px-3 py-1 transition-colors hover:bg-secondary/80">
              Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
