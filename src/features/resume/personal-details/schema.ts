import { z } from "zod";

// Create a schema for the social link form
export const SocialLinkSchema = z.object({
    desc: z.string(),
    link: z.string(),
});

// Create a schema for the personal details form
export const PersonalDetailSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    jobTitle: z.string(),
    address1: z.string(),
    address2: z.string(),
    phone: z.string(),
    email: z.string().min(1, "Email is required").email({ message: "Email must be a valid email address" }),
    socialLinks: z.array(SocialLinkSchema).optional(),
});

// Define a type alias for the inferred type of the schema
export type PersonalDetailSchemaField = z.infer<typeof PersonalDetailSchema>;
export type SocialLinkSchemaField = z.infer<typeof SocialLinkSchema>;

// Define default values for the personal details form
export const PersonalDetailDefaultValues: PersonalDetailSchemaField = {
    firstName: "",
    lastName: "",
    jobTitle: "",
    address1: "",
    address2: "",
    phone: "",
    email: "",
    socialLinks: [],
};
