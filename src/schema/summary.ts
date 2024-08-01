import { z } from "zod";

// Create a schema for the summary form
export const SummarySchema = z.object({
  hideProfilePicture: z.boolean(),
  profilePicture: z.string().or(
    // Define a or condition between string and file types for the profile picture
    z
      .instanceof(File, { message: "File must be an image" })
      // Refine the file input to ensure it is an image and less than 5MB
      .refine((file) => file.size < 5 * 1024 * 1024, {
        message: "File size must be less than 5MB",
      })
      // Refine the file input to ensure it is an image with the correct MIME type
      .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
        message: "File must be an image",
      })
  ),
  summary: z.string().max(1000, { message: "Summary must not exceed 1000 characters" }),
});

// Define a type alias for the inferred type of the schema
export type SummaryType = z.infer<typeof SummarySchema>;
