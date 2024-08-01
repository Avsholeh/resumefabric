"use client";

import FormButtonGroup from "@/components/shared/form-button-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SummaryType } from "@/schema/summary";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

export default function SummaryForm(): React.ReactElement {
  const router = useRouter();

  // This hook is used to create a reference to the file upload input element
  const fileUploadRef = useRef<HTMLInputElement>(null);

  // This hook is used to create a form instance with the useForm hook
  // https://react-hook-form.com/api/useform
  const form = useFormContext<SummaryType>();

  const onSubmit: SubmitHandler<SummaryType> = (fieldValue) => {
    console.log(fieldValue);
    // router.push("/final");
  };

  return (
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
                    <Checkbox onCheckedChange={field.onChange} checked={field.value} className="mt-2" />
                  </FormControl>
                  <FormLabel>Hide Profile Picture</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <div className="mb-5 flex items-center justify-between">
            <Avatar className="h-14 w-14">
              <AvatarImage src="" alt="profile-picture" />
              <AvatarFallback>RF</AvatarFallback>
            </Avatar>
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
                      {field.value ? "Change" : "Upload"}
                    </Button>
                    <FormControl className="hidden">
                      <Input
                        {...field}
                        type="file"
                        ref={fileUploadRef}
                        accept="image/jpeg, image/png"
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : undefined)}
                        value={""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.formState.errors.profilePicture && (
                <span className="text-error mt-2 text-sm">{form.formState.errors.profilePicture.message}</span>
              )}
            </div>
          </div>

          <FormField
            name="summary"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-2 w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </form>
  );
}
