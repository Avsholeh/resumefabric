import { z } from "zod";

// Create a schema for the skill array
export const SkillSchema = z.object({
    showExperienceLevel: z.boolean(),
    items: z.array(
        z.object({
            name: z.string(),
            experienceLevel: z.number().int().min(1).max(5),
        })
    ),
});

export const SkillManySchema = z.object({
    skills: SkillSchema,
});

// Define a type alias for the inferred type of the schema
export type SkillField = z.infer<typeof SkillSchema>;
export type SkillManyField = z.infer<typeof SkillManySchema>;

// Define default values for the skill array
export const SkillDefaultValues: SkillField = {
    showExperienceLevel: true,
    items: [{ name: "", experienceLevel: 3 }],
};

// Define default values for the skill array
export const SkillManyDefaultValues = {
    skills: SkillDefaultValues,
};
