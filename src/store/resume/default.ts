import type { AdditionalType } from "@/schema/additional";
import type { EducationType } from "@/schema/education";
import type { PersonalDetailType } from "@/schema/personal-details";
import type { ResumeType } from "@/schema/resume";
import type { SkillItemType, SkillType } from "@/schema/skills";
import type { SummaryType } from "@/schema/summary";
import type { WorkExperienceType } from "@/schema/work-experience";

export const PersonalDetailsDefault: PersonalDetailType = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  address1: "",
  address2: "",
  phone: "",
  email: "",
  socialLinks: [],
};

export const WorkExperienceDefault: WorkExperienceType = {
  positionTitle: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  currentlyWorkingHere: true,
  workSummary: "",
};

export const EducationDefault: EducationType = {
  schoolName: "",
  schoolLocation: "",
  degree: "",
  fieldStudy: "",
  startDate: "",
  endDate: "",
  currentlyStudyingHere: true,
  educationSummary: "",
};

export const SkillItemDefault: SkillItemType = {
  name: "",
  experienceLevel: 3,
};

export const SkillsDefault: SkillType = {
  showExperienceLevel: true,
  items: [SkillItemDefault],
};

export const AdditionalDefault: AdditionalType = {
  // custom_section: false,
  // certifications: false,
  // accomplishments: false,
  // volunteering: false,
  software: {
    section: "Software",
    items: [],
  },
};

export const SummaryDefault: SummaryType = {
  hideProfilePicture: false,
  profilePicture: "",
  summary: "",
};

export const ResumeDefault: ResumeType = {
  activeResume: null,
  resumeList: [
    {
      id: null,
      personalDetails: PersonalDetailsDefault,
      workExperiences: [WorkExperienceDefault],
      educations: [EducationDefault],
      skills: SkillsDefault,
      additional: AdditionalDefault,
      summary: SummaryDefault,
    },
  ],
};
