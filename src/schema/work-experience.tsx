import { z } from "zod";

// Create schema for the work experience form
export const WorkExperienceSchema = z.object({
    positionTitle: z.string(),
    companyName: z.string(),
    city: z.string(),
    state: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    currentlyWorkingHere: z.boolean(),
    workSummary: z.string(),
});

// Create schema for the work experience array
export const WorkExperienceManySchema = z.object({
    workExperiences: z.array(WorkExperienceSchema).optional(),
});

// Define a type alias for the inferred type of the schema
export type WorkExperienceType = z.infer<typeof WorkExperienceSchema>;
export type WorkExperienceManyType = z.infer<typeof WorkExperienceManySchema>;
