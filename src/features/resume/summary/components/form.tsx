"use client";

import FormButtonGroup from "@/components/shared/form-button-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SummaryDefaultValues, SummaryField, SummarySchema } from "../summary";

export default function SummaryForm(): React.ReactElement {
    const router = useRouter();
    const fileUploadRef = useRef<HTMLInputElement>(null);
    const form = useForm({
        resolver: zodResolver(SummarySchema),
        defaultValues: SummaryDefaultValues,
    });

    const onSubmit: SubmitHandler<SummaryField> = (fieldValue) => {
        console.log(fieldValue);
        router.push("/final");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="summary-form">
                <FormButtonGroup nextURL="/final" prevURL="/additional" showSkip />

                <Card>
                    <CardHeader>
                        <CardTitle>Summary</CardTitle>
                        <CardDescription>
                            Provide a brief summary of your professional background and career objectives.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-2 mt-3 flex justify-between">
                            <span>Profile Picture</span>
                            <FormField
                                name="hideProfilePicture"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                                className="mt-2"
                                            />
                                        </FormControl>
                                        <FormLabel>Hide Profile Picture</FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mb-5 flex items-center justify-between">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content w-16 rounded-full">
                                    <span className="text-3xl">RF</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <FormField
                                    name="profilePicture"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Button
                                                type="button"
                                                variant={"outline"}
                                                onClick={() => {
                                                    fileUploadRef.current?.click();
                                                }}
                                            >
                                                Choose File
                                            </Button>
                                            <FormControl className="hidden">
                                                <Input
                                                    {...field}
                                                    type="file"
                                                    ref={fileUploadRef}
                                                    accept="image/jpeg, image/png"
                                                    onChange={(e) =>
                                                        field.onChange(e.target.files ? e.target.files[0] : null)
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {form.formState.errors.profilePicture && (
                                    <span className="text-error mt-2 text-sm">
                                        {form.formState.errors.profilePicture.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <FormField
                            name="summary"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="mb-2 flex w-full">
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
