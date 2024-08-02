"use client";

import { PersonalDetailType } from "@/schema/personal-details";
import { useFormContext } from "react-hook-form";
import { identity } from "./identity";

export default function ModernTemplate(): React.ReactElement {
  const form = useFormContext<PersonalDetailType>();
  const { firstName, lastName, jobTitle, address1, address2, email } = identity.personalDetails;

  return (
    <div className="mx-auto max-w-3xl bg-white p-8 font-sans text-sm shadow-lg">
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
          <div>
            <a href="#" className="text-blue-600 hover:underline">
              LinkedIn Profile
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Professional Summary</h3>
          <p>
            Results-driven Human Resources professional with 8 years of experience in HR operations, including talent
            acquisition, employee relations, and performance management. Skilled in negotiating with labor unions and
            implementing effective HR strategies to enhance organizational efficiency.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Professional Experience</h3>

          <div className="mb-4">
            <h4 className="font-semibold">Human Resources Manager</h4>
            <div className="mb-1 flex justify-between text-sm text-gray-600">
              <span>Jim&apos;s Widget Factory, Plano, TX</span>
              <span>January 2016 - Present</span>
            </div>
            <ul className="list-disc pl-5">
              <li>Led recruitment efforts, resulting in a 20% decrease in time-to-hire</li>
              <li>Developed and implemented performance improvement plans, increasing overall productivity by 15%</li>
              <li>
                Successfully negotiated labor union contracts, ensuring fair compensation and benefits for employees
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Human Resources Associate</h4>
            <div className="mb-1 flex justify-between text-sm text-gray-600">
              <span>Jim&apos;s Widget Factory, Plano, TX</span>
              <span>March 2015 - January 2016</span>
            </div>
            <ul className="list-disc pl-5">
              <li>Assisted in streamlining the onboarding process, reducing orientation time by 25%</li>
              <li>Coordinated employee training programs, improving overall job satisfaction scores by 18%</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Education</h3>
          <div className="mb-1 flex justify-between">
            <span className="font-semibold">Masters in Human Resources</span>
            <span className="text-gray-600">September 2007 - May 2011</span>
          </div>
          <div>The University of Texas at Dallas</div>
        </section>

        <section className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Key Skills</h3>
          <ul className="grid list-disc grid-cols-2 gap-2 pl-5">
            <li>Employee Relations</li>
            <li>Performance Management</li>
            <li>Labor Law Compliance</li>
            <li>Talent Acquisition</li>
            <li>Conflict Resolution</li>
            <li>HRIS Systems</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Certifications</h3>
          <div className="mb-1">
            <span className="font-semibold">Professional in Human Resources (PHR)</span> - Human Resource Certification
            Institute (HRCI), September 2020
          </div>
        </section>
      </main>
    </div>
  );
}
