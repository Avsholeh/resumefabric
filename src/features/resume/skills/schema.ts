import { z } from "zod";

// Create a schema for the skill form
export const SkillSchema = z.object({
    name: z.string(),
    experienceLevel: z.number().int().min(1).max(5),
});

// Create a schema for the skill array
export const SkillArraySchema = z.object({
    showExperienceLevel: z.boolean(),
    skills: z.array(SkillSchema),
});

// Define a type alias for the inferred type of the schema
export type SkillField = z.infer<typeof SkillSchema>;
export type SkillArrayField = z.infer<typeof SkillArraySchema>;
