"use client";

import { PersonalDetailType } from "@/schema/personal-details";
import { ResumeItemType } from "@/schema/resume";
import { useMemo } from "react";
import { identity } from "./identity";

type Props = {
  resumeItem: ResumeItemType;
  watchItem: Partial<ResumeItemType>;
};

const getPersonalDetail = (
  watchItem: Partial<ResumeItemType>,
  resumeItem: ResumeItemType,
  field: keyof PersonalDetailType
): PersonalDetailType[keyof PersonalDetailType] =>
  watchItem?.personalDetails?.[field] || resumeItem?.personalDetails?.[field] || identity.personalDetails[field];

export default function ClassicTemplate({ resumeItem, watchItem }: Props): React.ReactElement {
  // Personal Details
  const personalDetailsFields = [
    "firstName",
    "lastName",
    "jobTitle",
    "address1",
    "address2",
    "email",
    "phone",
    "socialLinks",
  ] as const;
  const personalDetails = useMemo(
    () =>
      personalDetailsFields.reduce<PersonalDetailType>(
        (acc, field) => ({
          ...acc,
          [field]: getPersonalDetail(watchItem, resumeItem, field),
        }),
        identity.personalDetails
      ),
    [watchItem, resumeItem]
  );

  // Work Experiences
  const workExperiences = useMemo(() => {
    const keys = ["positionTitle", "companyName", "city", "state", "startDate", "endDate", "workSummary"] as const;
    if (watchItem?.workExperiences && watchItem.workExperiences.length > 0) {
      for (const key of keys) {
        if (watchItem.workExperiences[0][key]) {
          return watchItem.workExperiences;
        }
      }
    }
    return resumeItem?.workExperiences || identity.workExperiences;
  }, [watchItem, resumeItem]);

  return (
    <div className="border p-10 font-sans text-sm md:p-10">
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
        <section className="mb-5 font-bold">
          Human resources generalist with 8 years of experience in HR, including hiring and terminating, disciplining
          employees and helping department managers improve employee performance. Worked with labor unions to negotiate
          compensation packages for workers.
        </section>

        <article className="mb-5">
          <div className="mb-3 text-lg font-bold">Professional Experience</div>
          {workExperiences.map((workExperience, index) => (
            <section key={index} className="mb-3">
              <div className="font-bold">{workExperience.positionTitle}</div>
              <div className="flex justify-between">
                <i>
                  <span>{workExperience.companyName}</span>
                  {workExperience.city && <span>, {workExperience.city}</span>}
                  {workExperience.state && <span>, {workExperience.state}</span>}
                </i>
                <i>
                  <span>{workExperience.startDate}</span>
                  {workExperience.currentlyWorkingHere ? (
                    <span> - Present</span>
                  ) : (
                    <span> - {workExperience.endDate}</span>
                  )}
                </i>
              </div>
              {workExperience.workSummary}
            </section>
          ))}
        </article>

        <article className="mb-5">
          <div className="mb-3 text-lg font-bold">Education</div>
          <section className="mb-3">
            <div className="flex justify-between">
              <div>Masters in Human Resources</div>
              <div>September 2007 - May 2011</div>
            </div>
            <div>The University of Texas at Dallas</div>
          </section>
        </article>

        <article className="mb-5">
          <div className="mb-3 text-lg font-bold">Key Skills</div>
          <section>
            <ul>
              <li>Detail oriented - Competent</li>
              <li>Well-versed in Texas employment law - Competent</li>
              <li>Excellent written and oral communication skills - Competent</li>
              <li>Develops positive workplace relationships - Competent</li>
            </ul>
          </section>
        </article>

        <article className="mb-5">
          <div className="mb-3 text-lg font-bold">Certifications</div>
          <div>
            <div>Professional in Human Resources</div>
            <div>September 2020</div>
          </div>
          <div>Human Resource Certification Institute (HRCI)</div>
          <div>www.hrci.org/certifications/individual</div>
          <div>
            I earned the Professional in Human Resources certificate from the Human Resource Certification Institute
            (HRCI).
          </div>
        </article>
      </main>
    </div>
  );
}
