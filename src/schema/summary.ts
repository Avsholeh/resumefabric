import { z } from "zod";

// Create a schema for the summary form
export const SummarySchema = z.object({
  hideProfilePicture: z.boolean(),
  profilePicture: z
    // Union the file input to allow for undefined if the user chooses to hide the profile picture
    // or a valid file input if the user chooses to upload a profile picture
    .union([
      // Why nullish()? Because the file input can be null or undefined
      z.instanceof(File).nullish(),
      // Input must be a instance of File
      z
        .instanceof(File)
        // Refine the file input to ensure it is an image and less than 5MB
        .refine((file) => file.size < 5 * 1024 * 1024, {
          message: "File size must be less than 5MB",
        })
        // Refine the file input to ensure it is an image with the correct MIME type
        .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
          message: "File must be an image",
        }),
    ]),
  summary: z.string().max(1000, { message: "Summary must not exceed 1000 characters" }),
});

export const SummaryDefaultValues = {
  hideProfilePicture: false,
  profilePicture: undefined,
  summary: "",
};

// Define a type alias for the inferred type of the schema
export type SummaryField = z.infer<typeof SummarySchema>;
