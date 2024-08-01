import { z } from "zod";

export const SoftwareSchema = z.object({
    name: z.string(),
    level: z.number().int().min(1).max(5),
});

// level: Novice, Beginner, Skillful, Experienced, Expert

export const LanguageSchema = z.object({
    name: z.string(),
    level: z.number().int().min(1).max(5),
});

export const AdditionalSchema = z.object({
    // custom_section: z.boolean(),
    // certifications: z.boolean(),
    // accomplishments: z.boolean(),
    // volunteering: z.boolean(),
    software: z
        .object({
            section: z.string(),
            items: z.array(SoftwareSchema).optional(),
        })
        .optional(),
    language: z
        .object({
            section: z.string(),
            items: z.array(LanguageSchema).optional(),
        })
        .optional(),
    // references: z.boolean(),
});

export type SoftwareType = z.infer<typeof SoftwareSchema>;
export type LanguageType = z.infer<typeof LanguageSchema>;
export type AdditionalType = z.infer<typeof AdditionalSchema>;
