"use client";

import BtnDelete from "@/components/shared/btn-delete";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function SocialLinks() {
  // Get the control object from the useFormContext
  // https://react-hook-form.com/api/useformcontext
  const { control } = useFormContext();

  // Use the useFieldArray hook
  // https://react-hook-form.com/api/usefieldarray
  const { fields, remove, append } = useFieldArray({
    control,
    name: "socialLinks",
  });

  return (
    <>
      {fields.map((field, index) => (
        <Card key={field.id} className="mb-3">
          <CardContent className="pt-6">
            <div className="mb-2 flex flex-col items-center gap-3 md:flex-row">
              <FormField
                name={`socialLinks.${index}.desc`}
                control={control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`socialLinks.${index}.link`}
                control={control}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Link/Text/Etc.</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full justify-end">
              <BtnDelete onClick={() => remove(index)} />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button type="button" variant={"ghost"} onClick={() => append({ desc: "", link: "" })}>
          + Add Social Links
        </Button>
      </div>
    </>
  );
}
