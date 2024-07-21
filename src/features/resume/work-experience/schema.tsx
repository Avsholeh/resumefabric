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
export const WorkExperienceArraySchema = z.object({
    workExperiences: z.array(WorkExperienceSchema),
});

// Define a type alias for the inferred type of the schema
export type WorkExperienceSchemaField = z.infer<typeof WorkExperienceSchema>;
export type WorkExperienceArraySchemaField = z.infer<typeof WorkExperienceArraySchema>;

// Define default values for the work experience form
export const WorkExperienceDefaultValues = {
    positionTitle: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    currentlyWorkingHere: true,
    workSummary: "",
};

// Define default values for the work experience form
export const WorkExperienceArrayDefaultValues = {
    workExperiences: [WorkExperienceDefaultValues],
};
