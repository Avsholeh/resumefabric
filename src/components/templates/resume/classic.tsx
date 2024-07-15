export default function ClassicTemplate(): React.ReactElement {
    return (
        <div className="border p-10 font-serif text-sm md:p-20">
            <header className="mb-5">
                <div className="text-lg font-bold">Chris Candidate</div>
                <div className="font-bold">Human Resource Manager</div>
                <div className="flex justify-between">
                    <div>4759 Sunnydale Lane, Plano, TX 75071</div>
                    <div>email@youremail.com</div>
                </div>
                <div className="flex justify-between">
                    <div>(469) 385-2948</div>
                    <div className="flex flex-col">
                        <div>Social Desc #1: Social Link #1</div>
                        <div>Social Desc #2: Social Link #2</div>
                    </div>
                </div>
            </header>

            <main>
                <section className="mb-5 font-bold">
                    Human resources generalist with 8 years of experience in HR, including hiring and terminating,
                    disciplining employees and helping department managers improve employee performance. Worked with
                    labor unions to negotiate compensation packages for workers.
                </section>

                <article className="mb-5">
                    <div className="mb-3 text-lg font-bold">Professional Experience</div>

                    <section className="mb-3">
                        <div className="font-bold">Human Resources Manager</div>
                        <div className="flex justify-between">
                            <i>Jim&apos;s Widget Factory, Plano, TX</i>
                            <i>January 2016 - Present</i>
                        </div>
                        <ul>
                            <li>
                                Developed engaging lesson plans that catered to diverse learning styles and abilities
                            </li>
                            <li>Utilized technology resources to enhance the learning experience in the classroom</li>
                        </ul>
                    </section>

                    <section className="mb-3">
                        <div className="font-bold">Human Resources Associate</div>
                        <div className="flex justify-between">
                            <i>Jim&apos;s Widget Factory, Plano, TX</i>
                            <i>March 2015 - January 2016</i>
                        </div>
                        <ul>
                            <li>
                                Developed engaging lesson plans that catered to diverse learning styles and abilities
                            </li>
                            <li>Utilized technology resources to enhance the learning experience in the classroom</li>
                        </ul>
                    </section>
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
                        I earned the Professional in Human Resources certificate from the Human Resource Certification
                        Institute (HRCI).
                    </div>
                </article>
            </main>
        </div>
    );
}
