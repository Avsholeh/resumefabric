import { z } from "zod";

export const SkillItemSchema = z.object({
    name: z.string(),
    experienceLevel: z.number().int().min(1).max(5),
});

// Create a schema for the skill array
export const SkillSchema = z.object({
    showExperienceLevel: z.boolean(),
    items: z.array(SkillItemSchema),
});

// Define a type alias for the inferred type of the schema
export type SkillType = z.infer<typeof SkillSchema>;
export type SkillItemType = z.infer<typeof SkillItemSchema>;
