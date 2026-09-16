"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { Calendar, Video, Phone, Building, Loader2, Sparkles } from "lucide-react";
import { scheduleInterviewAction } from "@/features/employer-features/employer.actions";

export interface CandidateItemForSchedule {
  id: number;
  candidateName: string;
  candidateEmail: string;
  jobTitle?: string | null;
  interviewDate?: string | Date | null;
  interviewType?: string | null;
  interviewNotes?: string | null;
}

interface ScheduleInterviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: CandidateItemForSchedule | null;
  onSuccess?: () => void;
}

export function ScheduleInterviewDialog({
  open,
  onOpenChange,
  candidate,
  onSuccess,
}: ScheduleInterviewDialogProps) {
  const [isPending, startTransition] = useTransition();

  // Format initial date for datetime-local (YYYY-MM-DDTHH:MM)
  const getInitialDateTime = () => {
    if (candidate?.interviewDate) {
      try {
        const d = new Date(candidate.interviewDate);
        return d.toISOString().slice(0, 16);
      } catch {
        // fallback
      }
    }
    // Default to tomorrow 10:00 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  };

  const [dateTime, setDateTime] = useState(getInitialDateTime);
  const [interviewType, setInterviewType] = useState(
    candidate?.interviewType || "Video Call (Google Meet)"
  );
  const [notes, setNotes] = useState(candidate?.interviewNotes || "");

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && candidate) {
      setDateTime(getInitialDateTime());
      setInterviewType(candidate.interviewType || "Video Call (Google Meet)");
      setNotes(candidate.interviewNotes || "");
    }
    onOpenChange(isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidate) return;

    if (!dateTime) {
      toast.error("Please choose an interview date and time");
      return;
    }

    startTransition(async () => {
      const res = await scheduleInterviewAction(
        candidate.id,
        new Date(dateTime).toISOString(),
        interviewType,
        notes
      );

      if (res.status === "SUCCESS") {
        toast.success(res.message);
        onOpenChange(false);
        onSuccess?.();
      } else {
        toast.error(res.message || "Failed to schedule interview");
      }
    });
  };

  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
              <Calendar className="h-4 w-4" />
              Interview Management
            </div>
            <DialogTitle className="text-xl">Schedule Interview</DialogTitle>
            <DialogDescription>
              Set up an interview with <span className="font-semibold text-foreground">{candidate.candidateName}</span> for the{" "}
              <span className="font-semibold text-foreground">{candidate.jobTitle || "Job"}</span> position.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Date & Time */}
            <div className="space-y-1.5">
              <Label htmlFor="interview-datetime">Date & Time</Label>
              <div className="relative">
                <Input
                  id="interview-datetime"
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>

            {/* Interview Format / Type */}
            <div className="space-y-1.5">
              <Label htmlFor="interview-type">Interview Type & Medium</Label>
              <Select value={interviewType} onValueChange={setInterviewType}>
                <SelectTrigger id="interview-type">
                  <SelectValue placeholder="Select interview type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Video Call (Google Meet)">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-blue-500" />
                      <span>Video Call (Google Meet / Zoom)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Phone Screening">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-emerald-500" />
                      <span>Phone Screening (15-30 mins)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Technical Live Coding">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span>Technical Live Coding</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Onsite Interview">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-indigo-500" />
                      <span>Onsite Interview</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Final Culture Fit">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-violet-500" />
                      <span>Final Culture Fit Round</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Meeting Link & Instructions */}
            <div className="space-y-1.5">
              <Label htmlFor="interview-notes">Meeting Link & Instructions (Optional)</Label>
              <Textarea
                id="interview-notes"
                placeholder="e.g. Google Meet link: https://meet.google.com/xyz-abc or preparation tips..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="p-3 bg-muted/60 rounded-lg text-xs text-muted-foreground flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                Scheduling will automatically move this candidate to the <strong>Interview</strong> stage in your hiring pipeline.
              </span>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Confirm & Schedule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
