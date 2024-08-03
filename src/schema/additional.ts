import { z } from "zod";

export const CustomSectionSchema = z.object({
  name: z.string(),
  address1: z.string(),
  address2: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  summary: z.string(),
});

export const AccomplishmentSchema = z.object({
  name: z.string(),
  by: z.string(),
  date: z.string(),
  summary: z.string(),
});

export const AffiliationSchema = z.object({
  summary: z.string(),
});

export const VolunteeringSchema = z.object({
  name: z.string(),
  address1: z.string(),
  address2: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  summary: z.string(),
});

export const CertificationSchema = z.object({
  name: z.string(),
  by: z.string(),
  date: z.string(),
  url: z.string(),
  summary: z.string(),
});

export const SoftwareSchema = z.object({
  name: z.string(),
  level: z.number().int().min(1).max(5),
});

export const ReferenceSchema = z.object({
  name: z.string(),
  relationship: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  summary: z.string(),
});

export const InterestSchema = z.object({
  summary: z.string(),
});

export const LanguageSchema = z.object({
  name: z.string(),
  level: z.number().int().min(1).max(5), // level: Novice, Beginner, Skillful, Experienced, Expert
});

export const AdditionalSchema = z.object({
  customSection: z
    .object({
      section: z.string(),
      items: z.array(CustomSectionSchema),
    })
    .optional(),
  accomplishments: z
    .object({
      section: z.string(),
      items: z.array(AccomplishmentSchema).optional(),
    })
    .optional(),
  affiliations: z
    .object({
      section: z.string(),
      items: z.array(AffiliationSchema).optional(),
    })
    .optional(),
  volunteering: z
    .object({
      section: z.string(),
      items: z.array(VolunteeringSchema).optional(),
    })
    .optional(),
  certifications: z
    .object({
      section: z.string(),
      items: z.array(CertificationSchema).optional(),
    })
    .optional(),
  references: z
    .object({
      section: z.string(),
      items: z.array(ReferenceSchema).optional(),
    })
    .optional(),
  interests: z
    .object({
      section: z.string(),
      items: z.array(InterestSchema).optional(),
    })
    .optional(),
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
});

export type SoftwareType = z.infer<typeof SoftwareSchema>;
export type LanguageType = z.infer<typeof LanguageSchema>;
export type AdditionalType = z.infer<typeof AdditionalSchema>;
