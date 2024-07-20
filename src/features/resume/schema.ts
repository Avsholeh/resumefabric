import { z } from "zod";
import { PersonalDetailSchema } from "./personal-details/schema";
import { WorkExperienceArraySchema } from "./work-experience/schema";

export const ResumeSchema = z.object({
    id: z.string(),
    personalDetails: PersonalDetailSchema.optional(),
    workExperience: WorkExperienceArraySchema.optional(),
});

export const ResumeSchemaArray = z.array(ResumeSchema);

export type ResumeSchemaField = z.infer<typeof ResumeSchema>;
export type ResumeSchemaArrayField = z.infer<typeof ResumeSchemaArray>;
