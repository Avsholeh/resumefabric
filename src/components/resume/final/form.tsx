import { Mail, Printer } from "lucide-react";
import DownloadDialog from "./download-dialog";

export default function FinalForm() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold leading-none tracking-tight">Finish Your Resume</h2>
      <p className="mb-5 text-sm text-muted-foreground">
        Review your work, make edits, and download your resume. Updates can be made later as needed.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <DownloadDialog />
        <div className="min-w-[8rem] cursor-pointer border py-3">
          <div className="flex flex-col items-center">
            <Printer className="mb-2 h-6 w-6" />
            <span>Print</span>
          </div>
        </div>
        <div className="min-w-[8rem] cursor-pointer border py-3">
          <div className="flex flex-col items-center">
            <Mail className="mb-2 h-6 w-6" />
            <span>Email</span>
          </div>
        </div>
      </div>
    </div>
  );
}
