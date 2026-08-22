"use client";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Camera,
  Globe,
  Linkedin,
  Twitter,
  MapPin,
  Users,
  Calendar,
  Building2,
  Loader,
  Upload,
  X,
  Loader2,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  companyProfileData,
  CompanyProfileData,
} from "@/features/employer-features/employer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEmployerProfile } from "@/features/employer-features/employer.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import { useUploadThing } from "@/src/utils/uploadthing";
import { ComponentProps, useState } from "react";
import { useDropzone } from "@uploadthing/react";

const EmployerForm = ({employer}: {employer: any}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CompanyProfileData>({
    resolver: zodResolver(companyProfileData),
    defaultValues: {
      companyName: employer?.name || "My Company",
      tagline:
        employer?.metadata?.tagline ||
        "Building the future of technology",
      description:
        employer?.description ||
        "My Company is a leading technology company...",
      industry: employer?.industry || "technology",
      teamSize: employer?.teamSize || "500-1000",
      avatarUrl: employer?.avatarUrl,
      yearOfEstablishment:
        employer?.yearOfEstablishment || 2015,
      location: employer?.location || "San Francisco, CA",
      websiteUrl:
        employer?.websiteUrl || "https://mycompany.com",
      linkedinUrl:
        employer?.metadata?.socialLinks?.linkedin ||
        "https://linkedin.com/company/mycompany",
      twitterUrl:
        employer?.metadata?.socialLinks?.twitter ||
        "@mycompany",
      culture:
        employer?.metadata?.culture ||
        "At My Company, we believe in fostering a collaborative environment...",
      benefits:
        employer?.metadata?.benefits ||
        "• Competitive salary\n• Health insurance\n• Remote-friendly",
    },
  });

  const onSubmit = async (data: CompanyProfileData) => {
    const payload = {
      name: data.companyName,
      description: data.description,
      industry: data.industry,
      teamSize: data.teamSize,
      yearOfEstablishment: data.yearOfEstablishment,
      location: data.location,
      websiteUrl: data.websiteUrl,
      avatarUrl: data.avatarUrl,
      metadata: {
        tagline: data.tagline,
        culture: data.culture,
        benefits: data.benefits,
        socialLinks: {
          linkedin: data.linkedinUrl,
          twitter: data.twitterUrl,
        },
      },
    };
    console.log("Form submitted with data:", payload);
    const result = await updateEmployerProfile(payload);
    console.log(result.message);
  };  
  return (
    <main className="flex-1 overflow-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto p-6 lg:p-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Company Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your company information visible to candidates
            </p>
          </div>

          {/* Company Logo & Basic Info */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative">
                  <Label>Upload Logo</Label>
                  <Avatar className="h-25 w-25">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      <Controller
                        name="avatarUrl"
                        control={control}
                        render={({ field, fieldState }) => (
                          <div className="space-y-2">
                            <ImageUpload
                              value={field.value}
                              onChange={field.onChange}
                              boxText={
                                "A photo larger than 400 pixels works best. Max photo size 5 MB."
                              }
                              className={cn(
                                fieldState.error &&
                                  "ring-1 ring-destructive/50 rounded-lg",
                                "h-24 w-24 rounded-lg",
                              )}
                            />
                            {fieldState.error && (
                              <p className="text-sm text-destructive">
                                {fieldState.error.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" {...register("companyName")} />
                      {errors.companyName && (
                        <p className="text-xs text-destructive">
                          {errors.companyName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        defaultValue="Building the future of technology"
                        {...register("tagline")}
                      />
                      {errors.tagline && (
                        <p className="text-xs text-destructive">
                          {errors.tagline.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about">About the Company</Label>
                    <Textarea
                      id="about"
                      rows={4}
                      defaultValue="TechCorp Inc. is a leading technology company focused on building innovative solutions that help businesses scale. Our platform is used by over 10,000 companies worldwide."
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-xs text-destructive">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Company Details</CardTitle>
              <CardDescription>
                Key information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Industry
                  </Label>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">
                            Manufacturing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="company-size"
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" /> Company Size
                  </Label>
                  <Controller
                    name="teamSize"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">
                            51-200 employees
                          </SelectItem>
                          <SelectItem value="201-500">
                            201-500 employees
                          </SelectItem>
                          <SelectItem value="500-1000">
                            500-1000 employees
                          </SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Founded Year
                  </Label>
                  <Input
                    id="founded"
                    type="number"
                    defaultValue="2015"
                    {...register("yearOfEstablishment")}
                  />
                  {errors.yearOfEstablishment && (
                    <p className="text-xs text-destructive">
                      {errors.yearOfEstablishment.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="headquarters"
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" /> Headquarters
                  </Label>
                  <Input
                    id="headquarters"
                    defaultValue="San Francisco, CA"
                    {...register("location")}
                  />
                  {errors.location && (
                    <p className="text-xs text-destructive">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Online Presence */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Online Presence</CardTitle>
              <CardDescription>
                Your company&apos;s web and social media links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    defaultValue="https://techcorp.com"
                    {...register("websiteUrl")}
                  />
                  {errors.websiteUrl && (
                    <p className="text-xs text-destructive">
                      {errors.websiteUrl.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    defaultValue="linkedin.com/company/techcorp"
                    {...register("linkedinUrl")}
                  />
                  {errors.linkedinUrl && (
                    <p className="text-xs text-destructive">
                      {errors.linkedinUrl.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" /> Twitter / X
                  </Label>
                  <Input
                    id="twitter"
                    defaultValue="@techcorp"
                    {...register("twitterUrl")}
                  />
                  {errors.twitterUrl && (
                    <p className="text-xs text-destructive">
                      {errors.twitterUrl.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Culture */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Company Culture</CardTitle>
              <CardDescription>
                Describe what it&apos;s like to work at your company
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="culture">Culture & Values</Label>
                <Textarea
                  id="culture"
                  rows={4}
                  defaultValue="At TechCorp, we believe in fostering a collaborative and innovative environment. We value transparency, continuous learning, and work-life balance. Our team is passionate about solving complex problems and making a positive impact."
                  {...register("culture")}
                />
                {errors.culture && (
                  <p className="text-xs text-destructive">
                    {errors.culture.message}
                  </p>
                )}
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
                  {...register("benefits")}
                />
                {errors.benefits && (
                  <p className="text-xs text-destructive">
                    {errors.benefits.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            {isDirty && (
              <Button variant="outline" onClick={() => reset()}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={!isDirty}>
              {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default EmployerForm;

type ImageUploadProps = Omit<ComponentProps<"div">, "onChange"> & {
  value?: string;
  boxText?: string;
  onChange: (url: string) => void;
};

export const ImageUpload = ({
  value,
  onChange,
  className,
  boxText,
  ...props
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        onChange(res[0].ufsUrl);
        toast.success("Image uploaded successfully!");
      }
      setIsUploading(false);
      setPreviewUrl(null);
    },
    onUploadError: (error: Error) => {
      toast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
      setPreviewUrl(null);
    },
  });

  const handleFileSelect = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);
    await startUpload([file]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileSelect,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    disabled: isUploading,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setPreviewUrl(null);
  };

  if (value || previewUrl)
    return (
      <div
        className={cn(
          "overflow-hidden border-2 border-border relative group rounded-lg",
          className,
        )}
        {...props}
      >
        <Image
          src={previewUrl || value || ""}
          alt="Uploaded image"
          height={200}
          width={200}
          className="w-full h-full object-cover"
        />

        {isUploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
              <p className="text-sm text-white font-medium">Uploading...</p>
            </div>
          </div>
        )}

        {!isUploading && (
          <div
            {...getRootProps()}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
          >
            <input {...getInputProps()} />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Change
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        )}
      </div>
    );

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50",
        isUploading && "opacity-50 pointer-events-none",
        className,
      )}
      {...props}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
          <Upload className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">
          <span className="text-primary">Browse photo</span> or drop here
        </p>
        {boxText && (
          <p className="text-xs text-muted-foreground text-center px-4 max-w-xs">
            {boxText}
          </p>
        )}
      </div>
    </div>
  );
};

