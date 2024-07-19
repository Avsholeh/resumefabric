"use client";

import FormButtonGroup from "@/components/shared/form-button-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { SkillArrayField, SkillArraySchema } from "../schema";
import SkillCard from "./skill-card";

export default function SkillsForm(): React.ReactElement {
    const router = useRouter();

    // Create a form with the useForm hook
    // https://react-hook-form.com/api/useform
    const form = useForm<SkillArrayField>({
        resolver: zodResolver(SkillArraySchema),
        defaultValues: {
            showExperienceLevel: true,
            skills: [{ name: "", experienceLevel: 3 }],
        },
    });

    // Use the useFieldArray hook to manage the skills array
    // https://react-hook-form.com/api/usefieldarray
    const {
        fields: skills,
        append,
        remove,
    } = useFieldArray({
        control: form.control,
        name: "skills",
    });

    // Define the submit handler
    const onSubmit: SubmitHandler<SkillArrayField> = async (fieldValue) => {
        console.log(fieldValue);
        router.push("/additional");
    };

    return (
        <Form {...form}>
            <form id="skills-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FormButtonGroup nextURL="/additional" prevURL="/education" showSkip />

                <Card className="mb-20">
                    <CardHeader>
                        <CardTitle>Skills</CardTitle>
                        <CardDescription>List your key skills and areas of expertise.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex">
                            <FormField
                                name="showExperienceLevel"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel>Show experience level</FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {skills.map((skill, index) => (
                            <SkillCard
                                key={skill.id}
                                skill={skill}
                                index={index}
                                control={form.control}
                                watch={form.watch}
                                remove={remove}
                                isDelete={skills.length > 1}
                            />
                        ))}

                        <div className="flex w-full justify-end mt-3">
                            <Button
                                type="button"
                                variant={"ghost"}
                                onClick={() => append({ name: "", experienceLevel: 3 })}
                            >
                                + Add more skills
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
