import { z } from "zod";

export const CustomSectionSchema = z.object({
  name: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  summary: z.string().optional(),
});

export const AccomplishmentSchema = z.object({
  name: z.string().optional(),
  by: z.string().optional(),
  date: z.string().optional(),
  summary: z.string().optional(),
});

export const AffiliationSchema = z.object({
  summary: z.string().optional(),
});

export const VolunteeringSchema = z.object({
  name: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  summary: z.string().optional(),
});

export const CertificationSchema = z.object({
  name: z.string().optional(),
  by: z.string().optional(),
  date: z.string().optional(),
  url: z.string().optional(),
  summary: z.string().optional(),
});

export const SoftwareSchema = z.object({
  name: z.string().optional(),
  level: z.number().int().min(1).max(5),
});

export const ReferenceSchema = z.object({
  name: z.string().optional(),
  relationship: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  summary: z.string().optional(),
});

export const InterestSchema = z.object({
  summary: z.string().optional(),
});

export const LanguageSchema = z.object({
  name: z.string().optional(),
  level: z.number().int().min(1).max(5), // level: Novice, Beginner, Skillful, Experienced, Expert
});

export const AdditionalSchema = z.object({
  customSections: z
    .object({
      section: z.string().optional(),
      items: z.array(CustomSectionSchema),
    })
    .optional(),
  accomplishments: z
    .object({
      section: z.string().optional(),
      items: z.array(AccomplishmentSchema).optional(),
    })
    .optional(),
  affiliations: z
    .object({
      section: z.string().optional(),
      items: z.array(AffiliationSchema).optional(),
    })
    .optional(),
  volunteering: z
    .object({
      section: z.string().optional(),
      items: z.array(VolunteeringSchema).optional(),
    })
    .optional(),
  certifications: z
    .object({
      section: z.string().optional(),
      items: z.array(CertificationSchema).optional(),
    })
    .optional(),
  references: z
    .object({
      section: z.string().optional(),
      items: z.array(ReferenceSchema).optional(),
    })
    .optional(),
  interests: z
    .object({
      section: z.string().optional(),
      items: z.array(InterestSchema).optional(),
    })
    .optional(),
  softwares: z
    .object({
      section: z.string().optional(),
      items: z.array(SoftwareSchema).optional(),
    })
    .optional(),
  languages: z
    .object({
      section: z.string().optional(),
      items: z.array(LanguageSchema).optional(),
    })
    .optional(),
});

export type CustomSectionType = z.infer<typeof CustomSectionSchema>;
export type AccomplishmentType = z.infer<typeof AccomplishmentSchema>;
export type AffiliationType = z.infer<typeof AffiliationSchema>;
export type VolunteeringType = z.infer<typeof VolunteeringSchema>;
export type CertificationType = z.infer<typeof CertificationSchema>;
export type ReferenceType = z.infer<typeof ReferenceSchema>;
export type InterestType = z.infer<typeof InterestSchema>;
export type SoftwareType = z.infer<typeof SoftwareSchema>;
export type LanguageType = z.infer<typeof LanguageSchema>;
export type AdditionalType = z.infer<typeof AdditionalSchema>;
