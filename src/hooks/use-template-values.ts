import { identity } from "@/components/resume/templates/identity";
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
    return watchItem?.skills || resumeItem?.skills || identity.skills;
  }, [watchItem, resumeItem]);

  // Additional

  // Summary
  const summary = (watchItem?.summary || resumeItem?.summary || identity.summary) as SummaryType;

  return {
    personalDetails,
    workExperiences,
    educations,
    skills,
    summary,
  };
}
