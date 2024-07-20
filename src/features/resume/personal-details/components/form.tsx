"use client";

import FormButtonGroup from "@/components/shared/form-button-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResumeSchemaArrayField } from "../../schema";
import { PersonalDetailDefaultValues, PersonalDetailSchema, PersonalDetailSchemaField } from "../schema";
import SocialLinks from "./social-link";

export default function PersonalDetailsForm(): React.ReactElement {
    const router = useRouter();

    // Get the active resume from local storage
    const [activeResume, setActiveResume] = useLocalStorage<string | null>("active-resume", null);

    // Get the resume from local storage
    const [resume, setResume] = useLocalStorage<ResumeSchemaArrayField>("resume", []);

    // Use the useForm hook
    // https://react-hook-form.com/api/useform
    const form = useForm<PersonalDetailSchemaField>({
        resolver: zodResolver(PersonalDetailSchema),
        defaultValues: PersonalDetailDefaultValues,
    });

    // Handle form submission
    const onSubmit: SubmitHandler<PersonalDetailSchemaField> = async (fieldValue) => {
        // If there is no active resume, redirect to the getting started page to create a new resume
        if (!activeResume) {
            router.push("/getting-started");
            return;
        }

        // Update the resume in local storage with the latest personal details
        setResume((prev) => {
            const newResume = [...prev];

            // Find the active resume and update the personal details
            const activeResumeIndex = newResume.findIndex((r) => r.id === activeResume);
            if (activeResumeIndex !== -1) {
                newResume[activeResumeIndex].personalDetails = fieldValue;
            } else {
                // If the active resume is not found, create a new resume
                newResume.push({ id: activeResume, personalDetails: fieldValue });
            }

            return newResume;
        });

        // Redirect to the next step
        router.push("/work-experience");
    };

    useEffect(() => {
        // If there is a resume in local storage and the active resume is set
        // then populate the form with selected resume personal details
        if (resume.length > 0 && activeResume) {
            const selectedResume = resume.find((r) => r.id === activeResume);
            if (selectedResume && selectedResume.personalDetails) {
                form.reset(selectedResume.personalDetails);
            }
        }
    }, []);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="personal-details-form"
                className="flex w-full flex-col"
                autoComplete="true"
            >
                <FormButtonGroup nextURL="/work-experience" isLoading={form.formState.isSubmitting} />

                <Card className="mb-20">
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>
                            Start by telling us your name and preferred contact information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Card className="mb-3">
                            <CardContent className="pt-6">
                                <div className="flex flex-col gap-3 md:flex-row">
                                    <FormField
                                        name="firstName"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-1/2">
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="lastName"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-1/2">
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex">
                                    <FormField
                                        name="jobTitle"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Job Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-3 md:flex-row">
                                    <FormField
                                        name="address1"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-1/2">
                                                <FormLabel>Address 1</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="address2"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-1/2">
                                                <FormLabel>Address 2</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col gap-3 md:flex-row">
                                    <FormField
                                        name="phone"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-1/2">
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input {...field} autoComplete="tel" />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="email"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-1/2">
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input {...field} autoComplete="email" />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <SocialLinks />
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
