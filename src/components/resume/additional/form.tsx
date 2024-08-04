"use client";

import FormButtonGroup from "@/components/shared/form-button-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { AdditionalType } from "@/schema/additional";
import { CustomSectionDefault, SoftwareDefault } from "@/store/resume/default";
import { useResumeStore } from "@/store/resume/provider";
import { Clipboard, CogIcon, ComputerIcon, HandshakeIcon, MedalIcon, Scroll, Speech } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import CustomSectionForm from "./custom-section-form";
import SoftwareForm from "./software-form";

export default function AdditionalForm(): React.ReactElement {
  const router = useRouter();

  // Use the useResumeStore hook to get the updateResume function
  const { updateResumeItem } = useResumeStore((state) => state);

  // This hook is used to create a form instance with the useFormContext hook
  // https://react-hook-form.com/api/useformcontext
  const form = useFormContext<AdditionalType>();

  const {
    fields: customFields,
    append: customAppend,
    remove: customRemove,
  } = useFieldArray({
    control: form.control,
    name: "customSections.items",
  });

  const {
    fields: softwareFields,
    append: softwareAppend,
    remove: softwareRemove,
  } = useFieldArray({
    control: form.control,
    name: "softwares.items",
  });

  // This function is used to handle the click event on the card section
  // It will append a new form if the section is clicked
  const handleClickSection = (section: string) => {
    switch (section) {
      case "custom_sections":
        customAppend(CustomSectionDefault);
        break;
      case "softwares":
        softwareAppend(SoftwareDefault);
        break;
    }
  };

  const onSubmit: SubmitHandler<AdditionalType> = (fieldValue) => {
    updateResumeItem("additional", fieldValue);
    router.push("/summary");
  };

  return (
    <Form {...form}>
      <form id="additional-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormButtonGroup nextURL="/summary" prevURL="/skills" showSkip isLoading={form.formState.isSubmitSuccessful} />
        <Card className="mb-5">
          <CardHeader>
            <CardTitle>Additional</CardTitle>
            <CardDescription>Add any additional sections you want to include in your resume.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              <CardSection onClick={() => handleClickSection("custom_sections")} disabled={customFields.length > 0}>
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
              <CardSection onClick={() => handleClickSection("softwares")} disabled={softwareFields.length > 0}>
                <div className="flex justify-start space-x-2">
                  <ComputerIcon className="text-primary opacity-50" /> <span>Software</span>
                </div>
              </CardSection>
              <CardSection onClick={() => handleClickSection("languages")}>
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

        {customFields.length > 0 && (
          <CustomSectionForm fields={customFields} remove={customRemove} append={customAppend} />
        )}

        {softwareFields.length > 0 && (
          <SoftwareForm fields={softwareFields} remove={softwareRemove} append={softwareAppend} />
        )}
      </form>
    </Form>
  );
}

function CardSection({
  children,
  disabled,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode; disabled?: boolean }): React.ReactElement {
  return (
    <Card className={cn("cursor-pointer", !disabled ? "hover:scale-[1.03]" : "")} {...restProps}>
      <CardContent className="p-4 text-center">{children}</CardContent>
    </Card>
  );
}
