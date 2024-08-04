import { identity } from "@/components/resume/templates/identity";
import { AdditionalType } from "@/schema/additional";
import { EducationType } from "@/schema/education";
import { PersonalDetailType } from "@/schema/personal-details";
import { ResumeItemType } from "@/schema/resume";
import { SkillType } from "@/schema/skills";
import { SummaryType } from "@/schema/summary";
import { WorkExperienceType } from "@/schema/work-experience";
import { useMemo } from "react";

export default function useTemplateValues(resumeItem?: ResumeItemType, watchItem?: Partial<ResumeItemType>) {
  // Personal Details
  const personalDetails = useMemo<PersonalDetailType>(() => {
    const keys = [
      "firstName",
      "lastName",
      "jobTitle",
      "address1",
      "address2",
      "email",
      "phone",
      "socialLinks",
    ] as const;
    return keys.reduce<PersonalDetailType>(
      (acc, field) => ({
        ...acc,
        [field]:
          watchItem?.personalDetails?.[field] ||
          resumeItem?.personalDetails?.[field] ||
          identity.personalDetails[field],
      }),
      identity.personalDetails
    );
  }, [watchItem, resumeItem]);

  // Work Experiences
  const workExperiences = useMemo<WorkExperienceType[]>(() => {
    const keys = ["positionTitle", "companyName", "city", "state", "startDate", "endDate", "workSummary"] as const;
    if (watchItem?.workExperiences && watchItem.workExperiences.length > 0) {
      for (const key of keys) {
        if (watchItem.workExperiences[0][key]) {
          return watchItem.workExperiences;
        }
      }
    }
    if (resumeItem?.workExperiences && resumeItem.workExperiences.length > 0) {
      for (const key of keys) {
        if (resumeItem.workExperiences[0][key]) {
          return resumeItem.workExperiences;
        }
      }
    }
    return identity.workExperiences;
  }, [watchItem, resumeItem]);

  // Educations
  const educations = useMemo<EducationType[]>(() => {
    const keys = [
      "schoolName",
      "schoolLocation",
      "degree",
      "fieldStudy",
      "startDate",
      "endDate",
      "educationSummary",
    ] as const;
    if (watchItem?.educations && watchItem.educations.length > 0) {
      for (const key of keys) {
        if (watchItem.educations[0][key]) {
          return watchItem.educations;
        }
      }
    }
    if (resumeItem?.educations && resumeItem.educations.length > 0) {
      for (const key of keys) {
        if (resumeItem.educations[0][key]) {
          return resumeItem.educations;
        }
      }
    }
    return identity.educations;
  }, [watchItem, resumeItem]);

  // Skills
  const skills = useMemo<SkillType>(() => {
    if (watchItem?.skills?.items && watchItem.skills.items.length > 0) {
      if (watchItem.skills.items.some((item) => item.name)) {
        return watchItem.skills;
      }
    }
    if (resumeItem?.skills?.items && resumeItem.skills.items.length > 0) {
      if (resumeItem.skills.items.some((item) => item.name)) {
        return resumeItem.skills;
      }
    }
    return identity.skills;
  }, [watchItem, resumeItem]);

  // Additional
  const additional = useMemo<AdditionalType | undefined>(() => {
    const keys = [
      "customSections",
      "accomplishments",
      "affiliations",
      "volunteering",
      "certifications",
      "references",
      "interests",
      "softwares",
      "languages",
    ] as const;
    for (const key of keys) {
      if (watchItem?.additional?.[key]?.items && watchItem.additional[key].items.length > 0) {
        return watchItem.additional;
      }
    }
    return resumeItem?.additional;
  }, [watchItem, resumeItem]);

  // Summary
  const summary = (watchItem?.summary || resumeItem?.summary || identity.summary) as SummaryType;

  return {
    personalDetails,
    workExperiences,
    educations,
    skills,
    additional,
    summary,
  };
}
