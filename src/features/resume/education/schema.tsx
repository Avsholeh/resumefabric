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
export const EducationArraySchema = z.object({
    educations: z.array(EducationSchema),
});

// Define default values for the education form
export const EducationDefaultValues = {
    schoolName: "",
    schoolLocation: "",
    degree: "",
    fieldStudy: "",
    startDate: "",
    endDate: "",
    currentlyStudyingHere: true,
    educationSummary: "",
};

export const EducationArrayDefaultValues = {
    educations: [EducationDefaultValues],
};

// Define a type alias for the inferred type of the schema
export type EducationSchemaField = z.infer<typeof EducationSchema>;
export type EducationArraySchemaField = z.infer<typeof EducationArraySchema>;
