import { z } from "zod";

// Create schema for the education form
export const EducationSchema = z.object({
    schoolName: z.string(),
    schoolLocation: z.string(),
    degree: z.string(),
    fieldStudy: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    currentlyStudyingHere: z.boolean(),
    educationSummary: z.string(),
});

// Create schema for the education array
export const EducationManySchema = z.object({
    educations: z.array(EducationSchema).optional(),
});

// Define a type alias for the inferred type of the schema
export type EducationType = z.infer<typeof EducationSchema>;
export type EducationManyType = z.infer<typeof EducationManySchema>;
