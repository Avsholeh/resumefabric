export const identity = {
  personalDetails: {
    firstName: "Henry",
    lastName: "Candidate",
    jobTitle: "Human Resources Generalist",
    address1: "1600 Amphitheatre Parkway",
    address2: "Apartment 123",
    phone: "+1 (827) 879-3224",
    email: "test@example.com",
    socialLinks: [
      {
        desc: "LinkedIn",
        link: "https://www.linkedin.com/in/henry-candidate",
      },
      {
        desc: "Twitter",
        link: "https://twitter.com/henry-candidate",
      },
    ],
  },
  workExperiences: [
    {
      positionTitle: "Assistant Human Resources Manager",
      companyName: "Tech Company",
      city: "New York",
      state: "NY",
      startDate: "2019-01-01",
      endDate: "2020-01-01",
      currentlyWorkingHere: true,
      workSummary:
        "Managed a team of 5 HR professionals, responsible for all HR functions including recruitment, onboarding, training, and employee relations.",
    },
    {
      positionTitle: "Human Resources Coordinator",
      companyName: "Startup",
      city: "San Francisco",
      state: "CA",
      startDate: "2017-01-01",
      endDate: "2019-01-01",
      currentlyWorkingHere: false,
      workSummary:
        "Assisted with recruitment, onboarding, and training of new employees. Managed employee benefits and payroll.",
    },
  ],
  educations: [
    {
      schoolName: "University of California",
      schoolLocation: "Los Angeles, CA",
      degree: "Bachelor of Arts in Human Resources",
      fieldStudy: "Human Resources",
      startDate: "2015-01-01",
      endDate: "2019-01-01",
      currentlyStudyingHere: true,
      educationSummary:
        "Graduated with honors. Completed coursework in HR management, labor relations, and organizational behavior.",
    },
    {
      schoolName: "Purdue University",
      schoolLocation: "West Lafayette, IN",
      degree: "Master of Science in Human Resources",
      fieldStudy: "Human Resources",
      startDate: "2019-01-01",
      endDate: "2021-01-01",
      currentlyStudyingHere: false,
      educationSummary: "Research focus on employee engagement and retention.",
    },
  ],
  skills: {
    showExperienceLevel: true,
    items: [
      {
        name: "Recruitment",
        experienceLevel: 5,
      },
      {
        name: "Employee Relations",
        experienceLevel: 4,
      },
      {
        name: "Training & Development",
        experienceLevel: 3,
      },
    ],
  },
  summary: {
    hideProfilePicture: false,
    profilePicture: "",
    description:
      "Human resources generalist with 8 years of experience in HR, including hiring and terminating, disciplining employees and helping department managers improve employee performance. Worked with labor unions to negotiate compensation packages for workers.",
  },
};
