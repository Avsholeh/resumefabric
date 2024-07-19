import FormButtonGroup from "@/components/shared/form-button-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AdditionalForm(): React.ReactElement {
    return (
        <form id="additional-form">
            <FormButtonGroup nextURL="/summary" prevURL="/skills" showSkip />
            <Card>
                <CardHeader>
                    <CardTitle>Additional</CardTitle>
                    <CardDescription>
                        Add any additional sections you want to include in your resume.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                        <Link href="#">
                            <div className="card bg-base-100 mt-3 w-full cursor-pointer border border-slate-300">
                                <div className="card-body p-4">Custom Section</div>
                            </div>
                        </Link>
                        <Link href="#">
                            <div className="card bg-base-100 mt-3 w-full cursor-pointer border border-slate-300">
                                <div className="card-body p-4">Certifications</div>
                            </div>
                        </Link>
                        <Link href="#">
                            <div className="card bg-base-100 mt-3 w-full cursor-pointer border border-slate-300">
                                <div className="card-body p-4">Accomplishments</div>
                            </div>
                        </Link>
                        <Link href="#">
                            <div className="card bg-base-100 mt-3 w-full cursor-pointer border border-slate-300">
                                <div className="card-body p-4">Volunteering</div>
                            </div>
                        </Link>
                        <Link href="#">
                            <div className="card bg-base-100 mt-3 w-full cursor-pointer border border-slate-300">
                                <div className="card-body p-4">Software</div>
                            </div>
                        </Link>
                        <Link href="#">
                            <div className="card bg-base-100 mt-3 w-full cursor-pointer border border-slate-300">
                                <div className="card-body p-4">References</div>
                            </div>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
