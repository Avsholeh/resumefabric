import { AdditionalSchema } from "@/schema/additional";
import { EducationSchema } from "@/schema/education";
import { PersonalDetailType } from "@/schema/personal-details";
import { SkillSchema } from "@/schema/skills";
import { WorkExperienceSchema } from "@/schema/work-experience";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ResumeDefault } from "./default";

type PersonalDetailState = PersonalDetailType;
type WorkExperienceState = z.infer<typeof WorkExperienceSchema>;
type EducationState = z.infer<typeof EducationSchema>;
type SkillState = z.infer<typeof SkillSchema>;
type AdditionalState = z.infer<typeof AdditionalSchema>;

type ResumeItem = {
    id: string | null;
    personalDetails: PersonalDetailState;
    workExperiences: WorkExperienceState[];
    educations: EducationState[];
    skills: SkillState;
    additional: AdditionalState;
};

type ResumeState = {
    activeResume: string | null;
    resumeList: ResumeItem[];
};

type ResumeAction = {
    createNewResume: () => void;
    getResumeItem: (field: keyof ResumeItem) => any;
    updateResumeItem: (field: keyof ResumeItem, value: any) => void;
};

export type ResumeStore = ResumeState & ResumeAction;

export const createResumeStore = (initState: ResumeState = ResumeDefault) => {
    return create(
        persist(
            immer<ResumeStore>((set, get) => ({
                // Set the initial state from the default state object
                ...initState,

                createNewResume: () => {
                    set((state) => {
                        const newUUID = uuidv4();
                        const nullResumeIndex = state.resumeList.findIndex((resume) => resume.id === null);
                        if (nullResumeIndex !== -1) {
                            state.resumeList[nullResumeIndex].id = newUUID;
                        } else {
                            // Just in case, if there is no resume with null id, create a new one with the new UUID
                            // This should not happen, but just in case it does happen for some reason, we handle it
                            state.resumeList.push({
                                ...initState.resumeList[0],
                                id: newUUID,
                            });
                        }
                        state.activeResume = newUUID;
                    });
                },

                getResumeItem: (field: keyof ResumeItem) => {
                    return get().resumeList.find((resume) => resume.id === get().activeResume)?.[field];
                },

                updateResumeItem: <T extends keyof ResumeItem>(field: T, value: ResumeItem[T]) => {
                    set((state) => {
                        // If the activeResume is null, we need to create a new resume and set the activeResume to the new UUID
                        if (state.activeResume === null) {
                            state.activeResume = uuidv4();
                        }

                        // Find the resume with the active UUID
                        const resumeIndex = state.resumeList.findIndex((resume) => resume.id === state.activeResume);
                        if (resumeIndex === -1) {
                            // Find resume with null id and update the related field it
                            const nullResumeIndex = state.resumeList.findIndex((resume) => resume.id === null);
                            if (nullResumeIndex !== -1) {
                                state.resumeList[nullResumeIndex].id = state.activeResume;
                                state.resumeList[nullResumeIndex][field] = value;
                            } else {
                                // Just in case, if there is no resume with null id, create a new one with the new UUD
                                // This should not happen, but just in case it does happen for some reason, we handle it
                                state.resumeList.push({
                                    ...initState.resumeList[0],
                                    id: state.activeResume,
                                    [field]: value,
                                });
                            }
                        } else {
                            // Update the field in the resume with the active UUID
                            state.resumeList[resumeIndex][field] = value;
                        }
                    });
                },
            })),
            { name: "resume" }
        )
    );
};
