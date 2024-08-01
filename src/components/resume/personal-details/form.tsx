"use client";

import FormButtonGroup from "@/components/shared/form-button-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PersonalDetailType } from "@/schema/personal-details";
import { useResumeStore } from "@/store/resume/provider";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFormContext } from "react-hook-form";
import SocialLinks from "./social-link";

export default function PersonalDetailsForm(): React.ReactElement {
  const router = useRouter();

  // Use the useResume hook to get the resume and update the resume
  const { updateResumeItem } = useResumeStore((state) => state);

  // Use the useForm hook to create a form
  // https://react-hook-form.com/api/useformcontext
  const form = useFormContext<PersonalDetailType>();

  // Handle form submission
  const onSubmit: SubmitHandler<PersonalDetailType> = async (fieldValue) => {
    // Update the resume in local storage with the latest personal details
    updateResumeItem("personalDetails", fieldValue);

    // Redirect to the next step
    router.push("/work-experience");
  };

  return (
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
          <CardDescription>Start by telling us your name and preferred contact information.</CardDescription>
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
  );
}
