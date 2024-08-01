import { z } from "zod";
import { AdditionalSchema } from "./additional";
import { EducationSchema } from "./education";
import { PersonalDetailSchema } from "./personal-details";
import { SkillSchema } from "./skills";
import { SummarySchema } from "./summary";
import { WorkExperienceSchema } from "./work-experience";

// Create schema for the resume form
export const ResumeItemSchema = z.object({
  id: z.string().min(36, { message: "Please provide a valid ID" }).nullable(), // length of a UUID v4
  personalDetails: PersonalDetailSchema.optional(),
  workExperiences: z.array(WorkExperienceSchema).optional(),
  educations: z.array(EducationSchema).optional(),
  skills: SkillSchema.optional(),
  additional: AdditionalSchema.optional(),
  summary: SummarySchema.optional(),
});

export const ResumeSchema = z.object({
  activeResume: z.string().nullable(),
  resumeList: z.array(ResumeItemSchema),
});

// Create schema for the resume array
// export const ResumeSchemaArray = z.array(ResumeItemSchema);

// Define a type alias for the inferred type of the schema
export type ResumeType = z.infer<typeof ResumeSchema>;
export type ResumeItemType = z.infer<typeof ResumeItemSchema>;
// export type ResumeManyType = z.infer<typeof ResumeSchemaArray>;
