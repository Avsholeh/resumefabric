"use client";

import FormButtonGroup from "@/components/shared/form-button-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { AdditionalType } from "@/schema/additional";
import { useResumeStore } from "@/store/resume/provider";
import { Clipboard, CogIcon, ComputerIcon, HandshakeIcon, MedalIcon, Scroll, Speech } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import SoftwareForm from "./software-form";

export default function AdditionalForm(): React.ReactElement {
  const router = useRouter();

  // This hook is used to get the resume data from the context
  const { updateResumeItem } = useResumeStore((state) => state);

  // This hook is used to create a form instance with the useFormContext hook
  // https://react-hook-form.com/api/useformcontext
  const form = useFormContext<AdditionalType>();

  const {
    fields: softwareFields,
    append: softwareAppend,
    remove: softwareRemove,
  } = useFieldArray({
    control: form.control,
    name: "software.items",
  });

  // This function is used to handle the click event on the card section
  // It will append a new form if the section is clicked
  const handleClickSection = (section: string) => {
    if (section === "software" && softwareFields.length === 0) {
      softwareAppend({ name: "", level: 3 });
    }
  };

  const onSubmit: SubmitHandler<AdditionalType> = (fieldValue) => {
    // updateResume<{ additional: AdditionalType }>({ additional: fieldValue });
    updateResumeItem("additional", fieldValue);
    router.push("/summary");
  };

  return (
    <Form {...form}>
      <form id="additional-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormButtonGroup nextURL="/summary" prevURL="/skills" showSkip isLoading={form.formState.isSubmitting} />
        <Card className="mb-5">
          <CardHeader>
            <CardTitle>Additional</CardTitle>
            <CardDescription>Add any additional sections you want to include in your resume.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              <CardSection onClick={() => handleClickSection("custom_section")}>
                <div className="flex justify-start space-x-2">
                  <CogIcon className="text-primary opacity-50" /> <span>Custom Section</span>
                </div>
              </CardSection>
              <CardSection onClick={() => handleClickSection("certifications")}>
                <div className="flex justify-start space-x-2">
                  <Scroll className="text-primary opacity-50" /> <span>Certifications</span>
                </div>
              </CardSection>
              <CardSection onClick={() => handleClickSection("accomplishments")}>
                <div className="flex justify-start space-x-2">
                  <MedalIcon className="text-primary opacity-50" /> <span>Accomplishments</span>
                </div>
              </CardSection>
              <CardSection onClick={() => handleClickSection("volunteering")}>
                <div className="flex justify-start space-x-2">
                  <HandshakeIcon className="text-primary opacity-50" /> <span>Volunteering</span>
                </div>
              </CardSection>
              <CardSection onClick={() => handleClickSection("software")}>
                <div className="flex justify-start space-x-2">
                  <ComputerIcon className="text-primary opacity-50" /> <span>Software</span>
                </div>
              </CardSection>
              <CardSection onClick={() => handleClickSection("language")}>
                <div className="flex justify-start space-x-2">
                  <Speech className="text-primary opacity-50" /> <span>Language</span>
                </div>
              </CardSection>
              <CardSection onClick={() => handleClickSection("references")}>
                <div className="flex justify-start space-x-2">
                  <Clipboard className="text-primary opacity-50" /> <span>References</span>
                </div>
              </CardSection>
            </div>
          </CardContent>
        </Card>

        {softwareFields.length > 0 && (
          <SoftwareForm fields={softwareFields} remove={softwareRemove} append={softwareAppend} />
        )}
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
