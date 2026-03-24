"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Camera,
  Upload,
  Globe,
  Linkedin,
  Twitter,
  MapPin,
  Users,
  Calendar,
  Building2
} from "lucide-react"

export default function CompanyProfilePage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar 
        userType="employer" 
        userName="TechCorp Inc." 
        userEmail="hr@techcorp.com" 
      />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 lg:p-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Company Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your company information visible to candidates
            </p>
          </div>

          {/* Company Logo & Basic Info */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">TC</AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="TechCorp Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input id="tagline" defaultValue="Building the future of technology" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about">About the Company</Label>
                    <Textarea 
                      id="about" 
                      rows={4}
                      defaultValue="TechCorp Inc. is a leading technology company focused on building innovative solutions that help businesses scale. Our platform is used by over 10,000 companies worldwide."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Company Details</CardTitle>
              <CardDescription>Key information about your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Industry
                  </Label>
                  <Select defaultValue="technology">
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-size" className="flex items-center gap-2">
                    <Users className="h-4 w-4" /> Company Size
                  </Label>
                  <Select defaultValue="500-1000">
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500-1000">500-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Founded Year
                  </Label>
                  <Input id="founded" type="number" defaultValue="2015" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="headquarters" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Headquarters
                  </Label>
                  <Input id="headquarters" defaultValue="San Francisco, CA" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Online Presence */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Online Presence</CardTitle>
              <CardDescription>Your company&apos;s web and social media links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Website
                  </Label>
                  <Input id="website" type="url" defaultValue="https://techcorp.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Label>
                  <Input id="linkedin" defaultValue="linkedin.com/company/techcorp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" /> Twitter / X
                  </Label>
                  <Input id="twitter" defaultValue="@techcorp" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Culture */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Company Culture</CardTitle>
              <CardDescription>Describe what it&apos;s like to work at your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="culture">Culture & Values</Label>
                <Textarea 
                  id="culture" 
                  rows={4}
                  defaultValue="At TechCorp, we believe in fostering a collaborative and innovative environment. We value transparency, continuous learning, and work-life balance. Our team is passionate about solving complex problems and making a positive impact."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits & Perks</Label>
                <Textarea 
                  id="benefits" 
                  rows={4}
                  defaultValue="• Competitive salary and equity package
• Health, dental, and vision insurance
• Flexible work arrangements (remote-friendly)
• Unlimited PTO policy
• Professional development budget
• Home office setup allowance
• 401(k) with company matching"
                />
              </div>
            </CardContent>
          </Card>

          {/* Company Photos */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Company Photos</CardTitle>
              <CardDescription>Showcase your workplace and team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">Upload photo</p>
                  </div>
                </div>
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">Upload photo</p>
                  </div>
                </div>
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">Upload photo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
