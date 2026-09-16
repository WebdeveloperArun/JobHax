"use client";

import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  Users,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Star,
  BarChart3,
  Zap,
  Target,
  ChevronRight,
  MapPin,
  Clock,
  Award,
} from "lucide-react";
import { fetchEmployerAnalyticsAction } from "@/features/employer-features/employer.actions";

// ─── Types ────────────────────────────────────────────────────────────────────

interface JobPerformance {
  jobId: number;
  title: string;
  location: string;
  status: string | null;
  employmentType: string;
  totalApps: number;
  newApps: number;
  screeningApps: number;
  interviewApps: number;
  offeredApps: number;
  rejectedApps: number;
  starredApps: number;
  avgMatchScore: number;
}

interface AnalyticsData {
  employer: { name: string; email: string };
  summary: {
    totalJobs: number;
    activeJobs: number;
    draftJobs: number;
    pausedJobs: number;
    closedJobs: number;
    totalApplications: number;
    newApplications: number;
    screeningCount: number;
    interviewCount: number;
    offeredCount: number;
    rejectedCount: number;
    starredCount: number;
    avgMatchScore: number;
  };
  jobPerformance: JobPerformance[];
  pipeline: {
    new: number;
    screening: number;
    interview: number;
    offered: number;
    rejected: number;
  };
  topSkillsInDemand: Array<{ skill: string; count: number }>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pct(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

const jobStatusConfig: Record<string, { label: string; color: string }> = {
  published: { label: "Active", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  draft: { label: "Draft", color: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" },
  paused: { label: "Paused", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  closed: { label: "Closed", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  trend,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  accent: string;
  trend?: { value: string; up: boolean } | null;
}) {
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div
        className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at top right, ${accent}, transparent 70%)` }}
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: `${accent}18` }}
          >
            <Icon className="h-5 w-5" style={{ color: accent }} />
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                trend.up
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-rose-500/10 text-rose-500"
              }`}
            >
              {trend.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {trend.value}
            </div>
          )}
        </div>
        <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
        {sub && <p className="text-xs text-muted-foreground/70 mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

function PipelineStage({
  label,
  count,
  total,
  color,
  isLast,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
  isLast?: boolean;
}) {
  const width = pct(count, total);
  return (
    <div className="flex-1 relative">
      <div className="rounded-xl border border-border bg-card p-4 h-full flex flex-col items-center justify-center gap-2 text-center hover:shadow-md transition-shadow">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{ background: color }}
        >
          {count}
        </div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${width}%`, background: color }}
          />
        </div>
        <p className="text-xs text-muted-foreground">{width}% of total</p>
      </div>
      {!isLast && (
        <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
          <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
        </div>
      )}
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function AnalyticsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="flex-1 h-28 rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card><CardContent className="p-6 space-y-4">
          <Skeleton className="h-6 w-40 mb-2" />
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}
        </CardContent></Card>
        <Card><CardContent className="p-6 space-y-4">
          <Skeleton className="h-6 w-40 mb-2" />
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
        </CardContent></Card>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-6">
        <BarChart3 className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">No data yet</h2>
      <p className="text-muted-foreground max-w-sm">
        Post your first job to start seeing analytics about your recruitment pipeline.
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EmployerAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployerAnalyticsAction().then((res) => {
      if (res.status === "SUCCESS" && res.data) {
        setData(res.data as AnalyticsData);
      } else {
        setError((res as { status: string; message: string }).message ?? "Failed to load analytics");
      }
      setLoading(false);
    });
  }, []);

  const s = data?.summary;
  const interviewRate = s ? pct(s.interviewCount, s.totalApplications) : 0;
  const offerRate = s ? pct(s.offeredCount, s.interviewCount) : 0;

  const pipelineStages = data
    ? [
        { label: "New", count: data.pipeline.new, color: "#6366f1" },
        { label: "Screening", count: data.pipeline.screening, color: "#f59e0b" },
        { label: "Interview", count: data.pipeline.interview, color: "#3b82f6" },
        { label: "Offered", count: data.pipeline.offered, color: "#10b981" },
        { label: "Rejected", count: data.pipeline.rejected, color: "#f43f5e" },
      ]
    : [];

  const statusDistribution = data?.summary
    ? [
        { label: "New", count: data.summary.newApplications, color: "#6366f1" },
        { label: "Screening", count: data.summary.screeningCount, color: "#f59e0b" },
        { label: "Interview", count: data.summary.interviewCount, color: "#3b82f6" },
        { label: "Offered", count: data.summary.offeredCount, color: "#10b981" },
        { label: "Rejected", count: data.summary.rejectedCount, color: "#f43f5e" },
      ]
    : [];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar userType="employer" />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 lg:p-8 max-w-7xl">

          {/* ── Header ── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            </div>
            <p className="text-muted-foreground ml-12">
              Live recruitment insights for your active pipeline
            </p>
          </div>

          {/* ── Loading / Error / Empty / Data ── */}
          {loading ? (
            <AnalyticsSkeleton />
          ) : error ? (
            <div className="flex items-center justify-center py-24">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : !data || data.summary.totalJobs === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-8">

              {/* ── KPI Summary Cards ── */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  label="Total Applications"
                  value={s!.totalApplications}
                  sub={`${s!.starredCount} starred`}
                  icon={Users}
                  accent="#6366f1"
                  trend={null}
                />
                <StatCard
                  label="Active Jobs"
                  value={s!.activeJobs}
                  sub={`of ${s!.totalJobs} total jobs`}
                  icon={Briefcase}
                  accent="#10b981"
                  trend={null}
                />
                <StatCard
                  label="Interview Rate"
                  value={`${interviewRate}%`}
                  sub={`${s!.interviewCount} reached interview`}
                  icon={TrendingUp}
                  accent="#3b82f6"
                  trend={interviewRate > 0 ? { value: `${interviewRate}%`, up: interviewRate >= 20 } : null}
                />
                <StatCard
                  label="Avg Match Score"
                  value={s!.avgMatchScore ? `${s!.avgMatchScore}%` : "—"}
                  sub={`offer rate: ${offerRate}%`}
                  icon={Target}
                  accent="#f59e0b"
                  trend={null}
                />
              </div>

              {/* ── Job Status Overview ── */}
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  { label: "Published", count: s!.activeJobs, color: "text-emerald-600 bg-emerald-500/10" },
                  { label: "Draft", count: s!.draftJobs, color: "text-zinc-500 bg-zinc-500/10" },
                  { label: "Paused", count: s!.pausedJobs, color: "text-amber-600 bg-amber-500/10" },
                  { label: "Closed", count: s!.closedJobs, color: "text-rose-500 bg-rose-500/10" },
                ].map((item) => (
                  <Card key={item.label} className="border-border">
                    <CardContent className="p-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{item.label} Jobs</span>
                      <span className={`text-lg font-bold px-2.5 py-0.5 rounded-lg ${item.color}`}>
                        {item.count}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* ── Application Pipeline Funnel ── */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Zap className="h-4 w-4 text-primary" />
                    Hiring Pipeline
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Full applicant journey from submission to decision
                  </p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex flex-col lg:flex-row gap-3">
                    {pipelineStages.map((stage, i) => (
                      <PipelineStage
                        key={stage.label}
                        label={stage.label}
                        count={stage.count}
                        total={s!.totalApplications}
                        color={stage.color}
                        isLast={i === pipelineStages.length - 1}
                      />
                    ))}
                  </div>

                  {/* conversion row */}
                  <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/40 rounded-xl">
                    {[
                      { label: "Screening Rate", value: pct(s!.screeningCount, s!.totalApplications) },
                      { label: "Interview Rate", value: pct(s!.interviewCount, s!.totalApplications) },
                      { label: "Offer Rate", value: pct(s!.offeredCount, s!.interviewCount) },
                      { label: "Rejection Rate", value: pct(s!.rejectedCount, s!.totalApplications) },
                    ].map((m) => (
                      <div key={m.label} className="text-center">
                        <p className="text-2xl font-bold text-foreground">{m.value}%</p>
                        <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ── Job Performance + Status Distribution ── */}
              <div className="grid gap-8 lg:grid-cols-2">

                {/* Job Performance */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Job Performance
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Per-role applicant breakdown</p>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4">
                    {data.jobPerformance.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">No jobs posted yet</p>
                    ) : (
                      data.jobPerformance.map((job) => {
                        const cfg = jobStatusConfig[job.status ?? "draft"] ?? jobStatusConfig.draft;
                        return (
                          <div
                            key={job.jobId}
                            className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/[0.02] transition-colors"
                          >
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div className="min-w-0">
                                <h4 className="font-medium text-foreground truncate">{job.title}</h4>
                                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  {job.location}
                                  <span className="text-muted-foreground/40">•</span>
                                  <Clock className="h-3 w-3" />
                                  {job.employmentType}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {job.avgMatchScore > 0 && (
                                  <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                                    <Award className="h-3 w-3" />
                                    {job.avgMatchScore}%
                                  </span>
                                )}
                                <Badge variant="outline" className={`text-xs ${cfg.color}`}>
                                  {cfg.label}
                                </Badge>
                              </div>
                            </div>

                            {/* mini pipeline bar */}
                            <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden mb-2">
                              {job.newApps > 0 && (
                                <div style={{ flex: job.newApps, background: "#6366f1" }} />
                              )}
                              {job.screeningApps > 0 && (
                                <div style={{ flex: job.screeningApps, background: "#f59e0b" }} />
                              )}
                              {job.interviewApps > 0 && (
                                <div style={{ flex: job.interviewApps, background: "#3b82f6" }} />
                              )}
                              {job.offeredApps > 0 && (
                                <div style={{ flex: job.offeredApps, background: "#10b981" }} />
                              )}
                              {job.rejectedApps > 0 && (
                                <div style={{ flex: job.rejectedApps, background: "#f43f5e" }} />
                              )}
                            </div>

                            <div className="grid grid-cols-5 gap-1 text-center">
                              {[
                                { label: "New", count: job.newApps, color: "#6366f1" },
                                { label: "Screen", count: job.screeningApps, color: "#f59e0b" },
                                { label: "Interview", count: job.interviewApps, color: "#3b82f6" },
                                { label: "Offer", count: job.offeredApps, color: "#10b981" },
                                { label: "Reject", count: job.rejectedApps, color: "#f43f5e" },
                              ].map((s) => (
                                <div key={s.label}>
                                  <p className="text-sm font-semibold" style={{ color: s.color }}>{s.count}</p>
                                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                                </div>
                              ))}
                            </div>

                            {job.starredApps > 0 && (
                              <div className="flex items-center gap-1 mt-2 text-xs text-amber-600">
                                <Star className="h-3 w-3 fill-amber-500" />
                                {job.starredApps} starred
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>

                {/* Right column — Status Distribution + Top Skills */}
                <div className="space-y-8">

                  {/* Status Distribution */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        Application Status Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      {statusDistribution.map((item) => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-foreground">{item.label}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.count}{" "}
                              <span className="text-muted-foreground/60">
                                ({pct(item.count, s!.totalApplications)}%)
                              </span>
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${pct(item.count, s!.totalApplications)}%`,
                                background: item.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      {s!.totalApplications === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No applications yet
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Top Skills in Demand */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Zap className="h-4 w-4 text-primary" />
                        Top Skills You&apos;re Hiring For
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Extracted from your job postings</p>
                    </CardHeader>
                    <CardContent className="pt-4">
                      {data.topSkillsInDemand.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-6">
                          No skills tagged on your jobs yet
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {data.topSkillsInDemand.map((item, i) => {
                            const maxCount = data.topSkillsInDemand[0].count;
                            return (
                              <div key={item.skill} className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground w-4 text-right">
                                  {i + 1}
                                </span>
                                <span className="text-sm font-medium text-foreground w-32 truncate">
                                  {item.skill}
                                </span>
                                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-primary transition-all duration-700"
                                    style={{ width: `${pct(item.count, maxCount)}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground w-8 text-right">
                                  ×{item.count}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                </div>
              </div>

              {/* ── Starred Candidates Highlight ── */}
              {s!.starredCount > 0 && (
                <Card className="border-amber-500/20 bg-amber-500/[0.03]">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 flex-shrink-0">
                      <Star className="h-6 w-6 fill-amber-400 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {s!.starredCount} starred candidate{s!.starredCount !== 1 ? "s" : ""}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pct(s!.starredCount, s!.totalApplications)}% of all applicants have been flagged as top talent —
                        review them in the{" "}
                        <a href="/employer/candidates" className="text-primary underline underline-offset-2 hover:opacity-80">
                          Candidates
                        </a>{" "}
                        tab.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
