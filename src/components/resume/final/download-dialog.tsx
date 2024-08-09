"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useResumeStore } from "@/store/resume/provider";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import ButtonDOCX from "./button-docx";
import ButtonPDF from "./button-pdf";

export default function DownloadDialog() {
  const [resumeItemId, setResumeItemId] = useState<string | null>(null);
  const activeResumeItem = useResumeStore((state) => state.getActiveResumeItem());
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (activeResumeItem) {
      setResumeItemId(activeResumeItem.id);
    }
  }, [activeResumeItem]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="min-w-[8rem] cursor-pointer border py-3">
          <div className="flex flex-col items-center">
            <Download className="mb-2 h-6 w-6" />
            <span>Download</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download Resume</DialogTitle>
          <DialogDescription className="mb-5">
            Select the format in which you&apos;d like to download your resume:
          </DialogDescription>
        </DialogHeader>
        <div className="space-x-2">
          <ButtonPDF resumeId={resumeItemId} setMessage={setMessage} />
          <ButtonDOCX resumeId={resumeItemId} setMessage={setMessage} />
        </div>
        {message && <p className="text-sm text-destructive">{message}</p>}
      </DialogContent>
    </Dialog>
  );
}
