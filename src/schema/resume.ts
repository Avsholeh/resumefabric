import { z } from "zod";
import { AdditionalSchema } from "./additional";
import { EducationSchema } from "./education";
import { PersonalDetailSchema } from "./personal-details";
import { SkillSchema } from "./skills";
import { WorkExperienceSchema } from "./work-experience";

// Create schema for the resume form
export const ResumeSchema = z.object({
    id: z.string().min(36, { message: "Please provide a valid ID" }), // length of a UUID v4
    personalDetails: PersonalDetailSchema.optional(),
    workExperiences: z.array(WorkExperienceSchema).optional(),
    educations: z.array(EducationSchema).optional(),
    skills: SkillSchema.optional(),
    additional: AdditionalSchema.optional(),
});

// Create schema for the resume array
export const ResumeSchemaArray = z.array(ResumeSchema);

// Define a type alias for the inferred type of the schema
export type ResumeField = z.infer<typeof ResumeSchema>;
export type ResumeManyType = z.infer<typeof ResumeSchemaArray>;
