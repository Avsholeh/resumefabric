export const PersonalDetailsDefault = {
    firstName: "",
    lastName: "",
    jobTitle: "",
    address1: "",
    address2: "",
    phone: "",
    email: "",
    socialLinks: [],
};

export const WorkExperienceDefault = {
    positionTitle: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    currentlyWorkingHere: true,
    workSummary: "",
};

export const EducationDefault = {
    schoolName: "",
    schoolLocation: "",
    degree: "",
    fieldStudy: "",
    startDate: "",
    endDate: "",
    currentlyStudyingHere: true,
    educationSummary: "",
};

export const SkillDefault = {
    name: "",
    experienceLevel: 3,
};

export const SkillsDefault = {
    showExperienceLevel: true,
    items: [SkillDefault],
};

export const AdditionalDefault = {
    // custom_section: false,
    // certifications: false,
    // accomplishments: false,
    // volunteering: false,
    software: {
        section: "Software",
        items: [],
    },
};

export const ResumeDefault = {
    activeResume: null,
    resumeList: [
        {
            id: null,
            personalDetails: PersonalDetailsDefault,
            workExperiences: [WorkExperienceDefault],
            educations: [EducationDefault],
            skills: SkillsDefault,
            additional: AdditionalDefault,
        },
    ],
};
