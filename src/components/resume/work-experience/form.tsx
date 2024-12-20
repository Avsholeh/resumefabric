"use client";

import BtnDelete from "@/components/shared/btn-delete";
import FormButtonGroup from "@/components/shared/form-button-group";
import { MonthYearPicker } from "@/components/shared/month-year-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_DATE_FORMAT } from "@/lib/constants";
import type { WorkExperienceManyType, WorkExperienceType } from "@/schema/work-experience";
import { WorkExperienceDefault } from "@/store/resume/default";
import { useResumeStore } from "@/store/resume/provider";
import { format, parseISO } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";

export default function WorkExperienceForm(): React.ReactElement {
  const router = useRouter();

  // This hook is used to get and set the work experience data
  const { updateResumeItem } = useResumeStore((state) => state);

  // This state is used to keep track of the open state of the collapsible items
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  // Use the useFormContext hook to get the form context
  // https://react-hook-form.com/api/useformcontext
  const form = useFormContext<WorkExperienceManyType>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  // Function to handle the open state of the collapsible items
  const handleOpenItemsChange = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  // Utility function to watch the field values
  const watchField = (index: number, field: keyof WorkExperienceType) => {
    if (field === "startDate" || field === "endDate") {
      let modifiedValue = form.watch(`workExperiences.${index}.${field}`);
      if (modifiedValue) {
        return format(parseISO(modifiedValue), DEFAULT_DATE_FORMAT);
      }
    }
    return form.watch(`workExperiences.${index}.${field}`);
  };

  const onSubmit: SubmitHandler<WorkExperienceManyType> = async (fieldValue) => {
    updateResumeItem("workExperiences", fieldValue.workExperiences);
    router.push("/education");
  };

  return (
    <form id="work-experience" onSubmit={form.handleSubmit(onSubmit)}>
      <FormButtonGroup
        nextURL="/education"
        prevURL="/personal-details"
        showSkip
        isLoading={form.formState.isSubmitSuccessful}
      />

      <Card className="mb-20">
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Provide details about your most recent job.</CardDescription>
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
                      <span>{watchField(index, "positionTitle") || "Position Title"}, </span>
                      <span>{watchField(index, "companyName") || "Company Name"} | </span>
                      <span>{watchField(index, "startDate") || "Start Date"}</span>
                      <span> - </span>
                      <span>
                        {watchField(index, "currentlyWorkingHere")
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
                        name={`workExperiences.${index}.positionTitle`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>Position Title</FormLabel>
                            <FormControl>
                              <Input {...field} autoComplete="organization-title" />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name={`workExperiences.${index}.companyName`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input {...field} autoComplete="organization" />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row">
                      <FormField
                        name={`workExperiences.${index}.city`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} autoComplete="address-level2" />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name={`workExperiences.${index}.state`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-1/2">
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} autoComplete="address-level1" />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row">
                      <FormField
                        name={`workExperiences.${index}.startDate`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col md:w-1/2">
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <MonthYearPicker
                                {...field}
                                value={field.value}
                                format={DEFAULT_DATE_FORMAT}
                                onChange={(value) => field.onChange(value)}
                              />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name={`workExperiences.${index}.endDate`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col md:w-1/2">
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <MonthYearPicker
                                {...field}
                                value={field.value}
                                format={DEFAULT_DATE_FORMAT}
                                onChange={(value) => field.onChange(value)}
                                disabled={!!watchField(index, "currentlyWorkingHere")}
                              />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex w-full justify-end">
                      <FormField
                        name={`workExperiences.${index}.currentlyWorkingHere`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox className="mt-1" checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel>Currently Working Here</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-2 flex flex-col gap-3 md:flex-row">
                      <FormField
                        name={`workExperiences.${index}.workSummary`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Work Summary</FormLabel>
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
            <Button type="button" variant={"ghost"} onClick={() => append(WorkExperienceDefault)}>
              + Add More Work Experience
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
