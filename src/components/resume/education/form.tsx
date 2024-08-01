"use client";

import BtnDelete from "@/components/shared/btn-delete";
import DatePicker from "@/components/shared/date-picker";
import FormButtonGroup from "@/components/shared/form-button-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type EducationManyType } from "@/schema/education";
import { EducationDefault } from "@/store/resume/default";
import { useResumeStore } from "@/store/resume/provider";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";

type WatchFieldType = "schoolName" | "degree" | "startDate" | "endDate" | "currentlyStudyingHere";

export default function EducationForm(): React.ReactElement {
  const router = useRouter();

  // This hook returns the resume store and the update function
  const { updateResumeItem } = useResumeStore((state) => state);

  // This state is used to keep track of the open items in the collapsible
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  // Use the useFormContext hook to get the form context
  // https://react-hook-form.com/api/useformcontext
  const form = useFormContext<EducationManyType>();

  // Use the field array hook
  // https://react-hook-form.com/api/usefieldarray
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  // Watch a field in the education array
  const watchField = (index: number, field: WatchFieldType) => {
    return form.watch(`educations.${index}.${field}`);
  };

  // Handle open items change event for the collapsible component
  const handleOpenItemsChange = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  // Handle form submission event
  const onSubmit: SubmitHandler<EducationManyType> = async (fieldValue) => {
    if (fieldValue.educations) {
      updateResumeItem("educations", fieldValue.educations);
    }
    router.push("/skills");
  };

  return (
    <form id="education-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FormButtonGroup nextURL="/skills" prevURL="/work-experience" showSkip isLoading={form.formState.isSubmitting} />

      <Card className="mb-20">
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Provide information on your relevant education and current studies.</CardDescription>
        </CardHeader>
        <CardContent>
          {fields.map((field, index) => (
            <Card key={field.id} className="mb-3">
              <CardContent className="pt-6">
                <Collapsible
                  open={openItems[field.id] ?? true}
                  onOpenChange={() => handleOpenItemsChange(field.id)}
                  className="w-full"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold md:text-lg">
                      <span>{watchField(index, "schoolName") || "School Name"}, </span>
                      <span>{watchField(index, "degree") || "Degree"} | </span>
                      <span>{watchField(index, "startDate") || "Start Date"}</span>
                      <span> - </span>
                      <span>
                        {watchField(index, "currentlyStudyingHere")
                          ? "Present"
                          : watchField(index, "endDate") || "End Date"}
                      </span>
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent className="mt-5 space-y-2">
                    <div className="flex flex-col gap-3 md:flex-row">
                      <FormField
                        name={`educations.${index}.schoolName`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>School Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name={`educations.${index}.schoolLocation`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>School Location</FormLabel>
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
                        name={`educations.${index}.degree`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>Degree</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name={`educations.${index}.fieldStudy`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>Field of Study</FormLabel>
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
                        name={`educations.${index}.startDate`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <DatePicker field={field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name={`educations.${index}.endDate`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <DatePicker field={field} disabled={!!watchField(index, "currentlyStudyingHere")} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex w-full justify-end">
                      <FormField
                        name={`educations.${index}.currentlyStudyingHere`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox className="mt-1" checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel>Currently Studying Here</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-2 flex flex-col gap-3 md:flex-row">
                      <FormField
                        name={`educations.${index}.educationSummary`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Education Summary</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {fields.length > 1 && (
                      <div className="flex w-full justify-end">
                        <BtnDelete onClick={() => remove(index)} />
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
          <div className="flex w-full justify-end md:mb-0">
            <Button type="button" variant={"ghost"} onClick={() => append(EducationDefault)}>
              + Add More Education
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
