"use client";

import FormButtonGroup from "@/components/shared/form-button-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { AdditionalSchema, AdditionalSchemaDefaultValue, AdditionalSchemaField } from "../schema";
import SoftwareForm from "./software-form";

export default function AdditionalForm(): React.ReactElement {
    const form = useForm<AdditionalSchemaField>({
        resolver: zodResolver(AdditionalSchema),
        defaultValues: AdditionalSchemaDefaultValue,
    });

    const { fields: softwareFields, append: softwareAppend } = useFieldArray({
        control: form.control,
        name: "software.items",
    });

    const handleClickSection = (section: string) => {
        if (section === "software" && softwareFields.length === 0) {
            softwareAppend({ name: "", level: 3 });
        }
    };

    const onSubmit: SubmitHandler<AdditionalSchemaField> = (fieldValue) => {
        console.log("onSubmit", fieldValue);
    };

    return (
        <Form {...form}>
            <form id="additional-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FormButtonGroup
                    nextURL="/summary"
                    prevURL="/skills"
                    showSkip
                    isLoading={form.formState.isSubmitting}
                />
                <Card className="mb-5">
                    <CardHeader>
                        <CardTitle>Additional</CardTitle>
                        <CardDescription>
                            Add any additional sections you want to include in your resume.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                            <CardSection onClick={() => handleClickSection("custom_section")}>
                                Custom Section
                            </CardSection>
                            <CardSection onClick={() => handleClickSection("certifications")}>
                                Certifications
                            </CardSection>
                            <CardSection onClick={() => handleClickSection("accomplishments")}>
                                Accomplishments
                            </CardSection>
                            <CardSection onClick={() => handleClickSection("volunteering")}>Volunteering</CardSection>
                            <CardSection onClick={() => handleClickSection("software")}>Software</CardSection>
                            <CardSection onClick={() => handleClickSection("language")}>Language</CardSection>
                            <CardSection onClick={() => handleClickSection("references")}>References</CardSection>
                        </div>
                    </CardContent>
                </Card>

                {softwareFields.length > 0 && <SoftwareForm fields={softwareFields} />}
            </form>
        </Form>
    );
}

function CardSection({
    children,
    ...restProps
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }): React.ReactElement {
    return (
        <Card className="cursor-pointer hover:scale-105" {...restProps}>
            <CardContent className="p-4 text-center">{children}</CardContent>
        </Card>
    );
}
