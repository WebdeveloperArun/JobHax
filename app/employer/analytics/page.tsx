"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Briefcase, 
  Users, 
  Eye, 
  TrendingUp,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Clock,
  Target
} from "lucide-react"

const stats = [
  { 
    label: "Total Job Views", 
    value: "12,450", 
    change: "+18%", 
    trend: "up",
    icon: Eye 
  },
  { 
    label: "Total Applications", 
    value: "486", 
    change: "+24%", 
    trend: "up",
    icon: Users 
  },
  { 
    label: "Avg. Time to Hire", 
    value: "18 days", 
    change: "-3 days", 
    trend: "up",
    icon: Clock 
  },
  { 
    label: "Hire Rate", 
    value: "12.5%", 
    change: "+2.1%", 
    trend: "up",
    icon: CheckCircle 
  },
]

const jobPerformance = [
  {
    title: "Senior Frontend Developer",
    views: 3420,
    applications: 145,
    conversionRate: "4.2%",
    avgMatch: 82,
  },
  {
    title: "Product Designer",
    views: 2850,
    applications: 98,
    conversionRate: "3.4%",
    avgMatch: 78,
  },
  {
    title: "DevOps Engineer",
    views: 2180,
    applications: 76,
    conversionRate: "3.5%",
    avgMatch: 85,
  },
  {
    title: "Marketing Manager",
    views: 1560,
    applications: 54,
    conversionRate: "3.5%",
    avgMatch: 72,
  },
]

const applicationSources = [
  { source: "Direct", percentage: 45, count: 218 },
  { source: "LinkedIn", percentage: 28, count: 136 },
  { source: "Indeed", percentage: 15, count: 73 },
  { source: "Referral", percentage: 8, count: 39 },
  { source: "Other", percentage: 4, count: 20 },
]

const pipelineStats = [
  { stage: "New Applications", count: 86, percentage: 100 },
  { stage: "Screening", count: 52, percentage: 60 },
  { stage: "Interview", count: 24, percentage: 28 },
  { stage: "Offer", count: 8, percentage: 9 },
  { stage: "Hired", count: 5, percentage: 6 },
]

export default function EmployerAnalyticsPage() {
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
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
              <p className="text-muted-foreground mt-1">
                Track your recruitment performance and insights
              </p>
            </div>
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2 mb-8">
            {/* Job Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Job Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobPerformance.map((job) => (
                    <div key={job.title} className="p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-foreground">{job.title}</h4>
                        <span className="text-sm text-accent font-medium">{job.avgMatch}% avg match</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-foreground">{job.views.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground">{job.applications}</p>
                          <p className="text-xs text-muted-foreground">Applications</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground">{job.conversionRate}</p>
                          <p className="text-xs text-muted-foreground">Conversion</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Application Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Application Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationSources.map((source) => (
                    <div key={source.source}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{source.source}</span>
                        <span className="text-sm text-muted-foreground">
                          {source.count} ({source.percentage}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hiring Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Hiring Pipeline (Last 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-stretch gap-4">
                {pipelineStats.map((stage, index) => (
                  <div 
                    key={stage.stage}
                    className="flex-1 relative"
                  >
                    <div className="bg-primary/10 rounded-lg p-4 text-center h-full flex flex-col justify-center">
                      <p className="text-3xl font-bold text-primary">{stage.count}</p>
                      <p className="text-sm text-muted-foreground mt-1">{stage.stage}</p>
                      <p className="text-xs text-muted-foreground mt-2">{stage.percentage}% of total</p>
                    </div>
                    {index < pipelineStats.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 text-muted-foreground z-10">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">60%</p>
                    <p className="text-xs text-muted-foreground">Screening Rate</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">46%</p>
                    <p className="text-xs text-muted-foreground">Interview Rate</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">33%</p>
                    <p className="text-xs text-muted-foreground">Offer Rate</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">63%</p>
                    <p className="text-xs text-muted-foreground">Acceptance Rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
