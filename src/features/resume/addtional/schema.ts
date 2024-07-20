import { z } from "zod";

export const SoftwareSchema = z.object({
    name: z.string(),
    level: z.number().int().min(1).max(5),
});

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

export const AdditionalSchemaDefaultValue = {
    // custom_section: false,
    // certifications: false,
    // accomplishments: false,
    // volunteering: false,
    software: {
        section: "Software",
        items: [],
    },
};

export type SoftwareSchemaField = z.infer<typeof SoftwareSchema>;
export type LanguageSchemaField = z.infer<typeof LanguageSchema>;
export type AdditionalSchemaField = z.infer<typeof AdditionalSchema>;
