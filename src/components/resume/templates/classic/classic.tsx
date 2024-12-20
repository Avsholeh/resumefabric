"use client";

import useTemplateValues from "@/hooks/use-template-values";
import { combineTextWithSeparator, formatPeriod, skillLevelText } from "@/lib/utils";
import { ResumeItemType } from "@/schema/resume";

type Props = {
  resumeItem?: ResumeItemType;
  watchItem?: Partial<ResumeItemType>;
};

export default function ClassicTemplate({ resumeItem, watchItem }: Props): React.ReactElement {
  const { personalDetails, workExperiences, educations, skills, additional, summary } = useTemplateValues(
    resumeItem,
    watchItem
  );

  return (
    <div className="h-full min-h-[75vh] border p-10 font-sans text-xs md:p-10">
      <header className="mb-5">
        <div className="text-lg font-bold">
          <span>{personalDetails?.firstName} </span>
          <span>{personalDetails?.lastName}</span>
        </div>
        <div className="font-bold">{personalDetails?.jobTitle}</div>
        <div className="flex justify-between">
          <div>
            <span>{personalDetails?.address1}</span>
            {personalDetails?.address2 && <span>, {personalDetails?.address2}</span>}
          </div>
          <div>{personalDetails?.email}</div>
        </div>
        <div className="flex justify-between">
          <div>{personalDetails?.phone}</div>
          <div className="flex flex-col">
            {personalDetails?.socialLinks?.map((socialLink, index) => (
              <div key={index} className="text-end">
                {socialLink.desc}
                {socialLink.link && socialLink.desc && <span>: </span>}
                {socialLink.link}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="mb-3 font-bold">{summary.description}</section>

        <article className="mb-3">
          <div className="mb-2 text-sm font-bold">Professional Experience</div>
          {workExperiences.map((workExperience, index) => (
            <section key={index} className="mb-3">
              <div className="font-bold">{workExperience.positionTitle}</div>
              <div className="mb-1 flex justify-between italic">
                <div>
                  <span>{workExperience.companyName}</span>
                  {workExperience.city && <span>, {workExperience.city}</span>}
                  {workExperience.state && <span>, {workExperience.state}</span>}
                </div>
                <div>
                  {formatPeriod(workExperience.startDate, workExperience.endDate, workExperience.currentlyWorkingHere)}
                </div>
              </div>
              {workExperience.workSummary}
            </section>
          ))}
        </article>

        <article className="mb-3">
          <div className="mb-2 text-sm font-bold">Education</div>
          {educations.map((education, index) => (
            <section key={index} className="mb-3">
              <div className="font-bold">
                <span>{education.degree}</span>
                {education.fieldStudy && <span>, {education.fieldStudy}</span>}
              </div>
              <div className="mb-1 flex justify-between italic">
                <div>
                  <span>{education.schoolName}</span>
                  {education.schoolLocation && <span>at {education.schoolLocation}</span>}
                </div>
                <div>{formatPeriod(education.startDate, education.endDate, education.currentlyStudyingHere)}</div>
              </div>
              {education.educationSummary}
            </section>
          ))}
        </article>

        <article className="mb-3">
          <div className="mb-2 text-sm font-bold">Key Skills</div>
          <section>
            <ul className="list-disk">
              {skills.items
                .filter((skill) => skill.name)
                .map((skill, index) => (
                  <li key={index}>
                    <span>{skill.name}</span>
                    {skills.showExperienceLevel && <span> - {skillLevelText(skill.experienceLevel)}</span>}
                  </li>
                ))}
            </ul>
          </section>
        </article>

        {additional?.customSections && additional.customSections.items.length > 0 && (
          <article className="mb-5">
            <div className="mb-3 text-sm font-bold">{additional.customSections.section}</div>
            {additional.customSections?.items.map((customSection, index) => (
              <section key={index} className="mb-3">
                <div className="font-bold">{customSection.name}</div>
                <div className="mb-1 flex justify-between italic">
                  <div>{combineTextWithSeparator(customSection.address1, customSection.address2)}</div>
                  <div>{formatPeriod(customSection.startDate, customSection.endDate)}</div>
                </div>
                <div>{customSection.summary}</div>
              </section>
            ))}
          </article>
        )}
      </main>
    </div>
  );
}
