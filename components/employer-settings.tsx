"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Eye,
  EyeOff,
  Loader2,
  Check,
  Building2,
} from "lucide-react";
import {
  updateEmployerAccountSchema,
  UpdateEmployerAccountData,
  changeEmployerPasswordSchema,
  ChangeEmployerPasswordData,
  employerNotificationPreferencesSchema,
  EmployerNotificationPreferencesData,
} from "@/features/employer-features/employer.schema";
import {
  updateEmployerAccount,
  changeEmployerPassword,
  updateEmployerNotificationPreferences,
} from "@/features/employer-features/employer.actions";
import { cn } from "@/lib/utils";

type EmployerSettingsProps = {
  account: {
    name: string;
    userName: string;
    email: string;
    phoneNumber: string;
    companyName: string;
  };
  notifications: EmployerNotificationPreferencesData;
  plan: {
    id: "starter";
    name: string;
    priceLabel: string;
    activeJobs: number;
    totalJobs: number;
  };
};

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    description: "Hire with the core employer tools available today.",
    features: [
      "Company profile and job posts",
      "Candidate pipeline and messaging",
      "Interview scheduling",
      "Hiring analytics",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$99/mo",
    description: "For growing teams that need more visibility.",
    features: [
      "Everything in Starter",
      "Featured job listings",
      "Team seats and recruiter roles",
      "Priority candidate matching",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced hiring needs.",
    features: [
      "Everything in Professional",
      "SSO and audit logs",
      "Dedicated support",
      "Custom hiring workflows",
    ],
  },
] as const;

export function EmployerSettings({
  account,
  notifications,
  plan,
}: EmployerSettingsProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const accountForm = useForm<UpdateEmployerAccountData>({
    resolver: zodResolver(updateEmployerAccountSchema),
    defaultValues: {
      name: account.name,
      userName: account.userName,
      email: account.email,
      phoneNumber: account.phoneNumber,
    },
  });

  const passwordForm = useForm<ChangeEmployerPasswordData>({
    resolver: zodResolver(changeEmployerPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const notificationForm = useForm<EmployerNotificationPreferencesData>({
    resolver: zodResolver(employerNotificationPreferencesSchema),
    defaultValues: notifications,
  });

  const onSaveAccount = async (data: UpdateEmployerAccountData) => {
    const result = await updateEmployerAccount(data);
    if (result.status === "SUCCESS") {
      toast.success(result.message);
      accountForm.reset(data);
    } else {
      toast.error(result.message);
    }
  };

  const onChangePassword = async (data: ChangeEmployerPasswordData) => {
    const result = await changeEmployerPassword(data);
    if (result.status === "SUCCESS") {
      toast.success(result.message);
      passwordForm.reset();
    } else {
      toast.error(result.message);
    }
  };

  const onSaveNotifications = async (data: EmployerNotificationPreferencesData) => {
    const result = await updateEmployerNotificationPreferences(data);
    if (result.status === "SUCCESS") {
      toast.success(result.message);
      notificationForm.reset(data);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="container mx-auto p-6 lg:p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account, security, and hiring plan
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="plan" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Plan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <form
              onSubmit={accountForm.handleSubmit(onSaveAccount)}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update the login details for this employer account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" {...accountForm.register("name")} />
                      {accountForm.formState.errors.name && (
                        <p className="text-sm text-destructive">
                          {accountForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userName">Username</Label>
                      <Input id="userName" {...accountForm.register("userName")} />
                      {accountForm.formState.errors.userName && (
                        <p className="text-sm text-destructive">
                          {accountForm.formState.errors.userName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" {...accountForm.register("email")} />
                      {accountForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {accountForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Optional"
                        {...accountForm.register("phoneNumber")}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={
                        !accountForm.formState.isDirty ||
                        accountForm.formState.isSubmitting
                      }
                    >
                      {accountForm.formState.isSubmitting && (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>
                    Public company details live on the company profile page
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {account.companyName || "Incomplete company profile"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Edit name, website, culture, and branding there
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/employer/company">Edit company</Link>
                  </Button>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Choose a strong password with mixed case and a number
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={passwordForm.handleSubmit(onChangePassword)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        {...passwordForm.register("currentPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((value) => !value)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="text-sm text-destructive">
                        {passwordForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        {...passwordForm.register("newPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((value) => !value)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {passwordForm.formState.errors.newPassword && (
                      <p className="text-sm text-destructive">
                        {passwordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...passwordForm.register("confirmPassword")}
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-destructive">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={passwordForm.formState.isSubmitting}
                    >
                      {passwordForm.formState.isSubmitting && (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      )}
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <form onSubmit={notificationForm.handleSubmit(onSaveNotifications)}>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose which hiring alerts you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(
                    [
                      {
                        name: "newApplications" as const,
                        title: "New Applications",
                        description: "Get notified when someone applies to your jobs",
                      },
                      {
                        name: "applicationUpdates" as const,
                        title: "Application Updates",
                        description: "When candidates update their application details",
                      },
                      {
                        name: "weeklyReports" as const,
                        title: "Weekly Reports",
                        description: "Summary of your recruitment activity",
                      },
                      {
                        name: "productUpdates" as const,
                        title: "Product Updates",
                        description: "New features and improvements",
                      },
                    ] as const
                  ).map((item, index) => (
                    <div key={item.name}>
                      {index > 0 && <Separator className="mb-4" />}
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <Controller
                          control={notificationForm.control}
                          name={item.name}
                          render={({ field }) => (
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={
                        !notificationForm.formState.isDirty ||
                        notificationForm.formState.isSubmitting
                      }
                    >
                      {notificationForm.formState.isSubmitting && (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      )}
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          <TabsContent value="plan">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    You are on the {plan.name} plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-primary bg-primary/5">
                    <div>
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Core hiring tools for a single employer account
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{plan.priceLabel}</p>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border p-4">
                      <p className="text-sm text-muted-foreground">Active jobs</p>
                      <p className="text-2xl font-semibold">{plan.activeJobs}</p>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <p className="text-sm text-muted-foreground">Total jobs posted</p>
                      <p className="text-2xl font-semibold">{plan.totalJobs}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 lg:grid-cols-3">
                {plans.map((tier) => {
                  const isCurrent = tier.id === plan.id;
                  return (
                    <Card
                      key={tier.id}
                      className={cn(isCurrent && "border-primary")}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between gap-2">
                          <CardTitle className="text-lg">{tier.name}</CardTitle>
                          {isCurrent && <Badge>Current</Badge>}
                        </div>
                        <p className="text-2xl font-bold">{tier.price}</p>
                        <CardDescription>{tier.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {tier.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-sm"
                            >
                              <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        {isCurrent ? (
                          <Button className="w-full" disabled>
                            Current plan
                          </Button>
                        ) : (
                          <Button className="w-full" variant="outline" disabled>
                            Coming soon
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
