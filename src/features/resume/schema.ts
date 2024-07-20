import { z } from "zod";
import { PersonalDetailDefaultValues, PersonalDetailSchema } from "./personal-details/schema";
import { WorkExperienceArrayDefaultValues, WorkExperienceSchema } from "./work-experience/schema";

export const ResumeSchema = z.object({
    id: z.string(),
    personalDetails: PersonalDetailSchema.optional(),
    workExperiences: z.array(WorkExperienceSchema).optional(),
});

export const ResumeSchemaArray = z.array(ResumeSchema);

export const ResumeDefaultValue = {
    id: "",
    personalDetails: PersonalDetailDefaultValues,
    workExperiences: WorkExperienceArrayDefaultValues.workExperiences,
};

export type ResumeSchemaField = z.infer<typeof ResumeSchema>;
export type ResumeSchemaArrayField = z.infer<typeof ResumeSchemaArray>;
