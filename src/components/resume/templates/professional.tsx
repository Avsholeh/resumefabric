"use client";

import identity from "@/components/resume/templates/identity.json";
import { PersonalDetailType } from "@/schema/personal-details";
import { useFormContext } from "react-hook-form";

export default function ProfessionalTemplate(): React.ReactElement {
  const form = useFormContext<PersonalDetailType>();
  const { firstName, lastName, jobTitle, address1, address2, email } = identity.personalDetails;

  return (
    <div className="mx-auto max-w-4xl bg-white p-8 font-sans text-sm shadow-lg">
      <header className="mb-6 border-b pb-4">
        <h1 className="mb-2 text-3xl font-bold">
          {form.watch("firstName") || firstName} {form.watch("lastName") || lastName}
        </h1>
        <h2 className="mb-2 text-xl text-gray-600">{form.watch("jobTitle") || jobTitle}</h2>
        <div className="flex flex-wrap justify-between text-sm text-gray-600">
          <div>
            {form.watch("address1") || address1} {form.watch("address2") || address2}
          </div>
          <div>{form.watch("email") || email}</div>
          <div>(469) 385-2948</div>
          <div>LinkedIn: linkedin.com/in/yourprofile</div>
        </div>
      </header>

      <main>
        <section className="mb-6">
          <h3 className="mb-2 border-b text-lg font-bold text-gray-800">Professional Summary</h3>
          <p>
            Results-driven Human Resources professional with 8+ years of experience in HR operations, talent
            acquisition, and employee relations. Skilled in developing and implementing HR strategies that align with
            organizational goals. Proven track record in improving employee performance and negotiating labor
            agreements.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="mb-2 border-b text-lg font-bold text-gray-800">Professional Experience</h3>

          <div className="mb-4">
            <div className="flex items-baseline justify-between">
              <h4 className="font-bold">Human Resources Manager</h4>
              <span className="text-sm text-gray-600">January 2016 - Present</span>
            </div>
            <div className="mb-2 italic">Jim's Widget Factory, Plano, TX</div>
            <ul className="list-disc pl-5">
              <li>Led a team of 5 HR professionals, overseeing all HR functions for a 200+ employee organization</li>
              <li>Reduced employee turnover by 15% through implementation of targeted retention strategies</li>
              <li>Streamlined the hiring process, reducing time-to-hire by 20% while improving quality of hires</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex items-baseline justify-between">
              <h4 className="font-bold">Human Resources Associate</h4>
              <span className="text-sm text-gray-600">March 2015 - January 2016</span>
            </div>
            <div className="mb-2 italic">Jim's Widget Factory, Plano, TX</div>
            <ul className="list-disc pl-5">
              <li>Assisted in the development and implementation of HR policies and procedures</li>
              <li>Conducted new employee orientations and managed the onboarding process</li>
              <li>Maintained employee records and ensured compliance with labor laws and regulations</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h3 className="mb-2 border-b text-lg font-bold text-gray-800">Education</h3>
          <div className="flex justify-between">
            <div>
              <div className="font-bold">Masters in Human Resources</div>
              <div>The University of Texas at Dallas</div>
            </div>
            <div className="text-sm text-gray-600">September 2007 - May 2011</div>
          </div>
        </section>

        <section className="mb-6">
          <h3 className="mb-2 border-b text-lg font-bold text-gray-800">Skills</h3>
          <ul className="list-disc columns-2 pl-5">
            <li>Employee Relations</li>
            <li>Performance Management</li>
            <li>Talent Acquisition</li>
            <li>Labor Law Compliance</li>
            <li>Compensation & Benefits</li>
            <li>HRIS Systems</li>
            <li>Conflict Resolution</li>
            <li>Training & Development</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-2 border-b text-lg font-bold text-gray-800">Certifications</h3>
          <div className="mb-2">
            <span className="font-bold">Professional in Human Resources (PHR)</span> - Human Resource Certification
            Institute (HRCI), September 2020
          </div>
        </section>
      </main>
    </div>
  );
}
