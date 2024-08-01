"use client";

import FormButtonGroup from "@/components/shared/form-button-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { type SkillType } from "@/schema/skills";
import { useResumeStore } from "@/store/resume/provider";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import SkillCard from "./skill-card";

export default function SkillsForm(): React.ReactElement {
  const router = useRouter();

  const { updateResumeItem } = useResumeStore((state) => state);

  // Create a form with the useForm hook
  // https://react-hook-form.com/api/useform
  const form = useFormContext<SkillType>();

  // Use the useFieldArray hook to manage the skills array
  // https://react-hook-form.com/api/usefieldarray
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // Define the submit handler
  const onSubmit: SubmitHandler<SkillType> = async (fieldValue) => {
    updateResumeItem("skills", fieldValue);
    router.push("/additional");
  };

  return (
    <form id="skills-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FormButtonGroup nextURL="/additional" prevURL="/education" showSkip isLoading={form.formState.isSubmitting} />

      <Card className="mb-20">
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>List your key skills and areas of expertise.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-5 flex">
            <FormField
              name="showExperienceLevel"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-2" />
                  </FormControl>
                  <FormLabel>Show experience level</FormLabel>
                </FormItem>
              )}
            />
          </div>

          {fields.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              index={index}
              control={form.control}
              watch={form.watch}
              remove={remove}
              isDelete={fields.length > 1}
            />
          ))}

          <div className="mt-3 flex w-full justify-end">
            <Button type="button" variant={"ghost"} onClick={() => append({ name: "", experienceLevel: 3 })}>
              + Add more skills
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
