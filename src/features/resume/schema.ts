import { z } from "zod";
import { EducationArrayDefaultValues, EducationSchema } from "./education/schema";
import { PersonalDetailDefaultValues, PersonalDetailSchema } from "./personal-details/schema";
import { WorkExperienceArrayDefaultValues, WorkExperienceSchema } from "./work-experience/schema";

// Create schema for the resume form
export const ResumeSchema = z.object({
    id: z.string().min(36, { message: "Please provide a valid ID" }), // length of a UUID v4
    personalDetails: PersonalDetailSchema.optional(),
    workExperiences: z.array(WorkExperienceSchema).optional(),
    educations: z.array(EducationSchema).optional(),
});

// Create schema for the resume array
export const ResumeSchemaArray = z.array(ResumeSchema);

// Define a type alias for the inferred type of the schema
export type ResumeSchemaField = z.infer<typeof ResumeSchema>;
export type ResumeSchemaArrayField = z.infer<typeof ResumeSchemaArray>;

// Define default values for the resume form
export const ResumeDefaultValue = {
    id: "",
    personalDetails: PersonalDetailDefaultValues,
    workExperiences: WorkExperienceArrayDefaultValues,
    educations: EducationArrayDefaultValues,
};
