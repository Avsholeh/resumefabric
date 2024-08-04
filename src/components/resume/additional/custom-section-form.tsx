import BtnDelete from "@/components/shared/btn-delete";
import { MonthYearPicker } from "@/components/shared/month-year-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useClickOutside } from "@/hooks/use-click-outside";
import { DEFAULT_DATE_FORMAT } from "@/lib/constants";
import { AdditionalDefault, CustomSectionDefault } from "@/store/resume/default";
import { CheckIcon, PencilIcon } from "lucide-react";
import { useRef, useState } from "react";
import {
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import { AdditionalType, CustomSectionType } from "../../../schema/additional";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  fields: FieldArrayWithId<CustomSectionType>[];
  append: UseFieldArrayAppend<AdditionalType>;
  remove: UseFieldArrayRemove;
};

export default function CustomSectionForm({ fields, append, remove }: Props): React.ReactElement {
  const form = useFormContext();
  const [isEdit, setIsEdit] = useState(false);
  const titleRef = useRef(null);

  useClickOutside(titleRef, () => setIsEdit(false));

  const onDelete = (index: number) => {
    form.setValue("customSections.section", AdditionalDefault?.customSections?.section || "Custom Sections");
    remove(index);
  };

  return (
    <Card className="mb-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isEdit ? (
            <>
              <FormField
                name={`customSections.section`}
                control={form.control}
                render={({ field }) => (
                  <FormItem ref={titleRef}>
                    <Input {...field} value={field.value} />
                  </FormItem>
                )}
              />
              <Button type="button" variant={"ghost"} size={"sm"} onClick={() => setIsEdit(!isEdit)}>
                <CheckIcon className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <span className="mr-3">{form.watch("customSections.section")}</span>
              <Button variant={"ghost"} size={"sm"} onClick={() => setIsEdit(!isEdit)}>
                <PencilIcon className="h-4 w-4" />
              </Button>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-3 flex flex-col gap-5">
            <FormField
              name={`customSections.items.${index}.name`}
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <Input {...field} value={field.value} />
                  </FormItem>
                </FormControl>
              )}
            />

            <div className="flex w-full justify-between gap-5">
              <FormField
                name={`customSections.items.${index}.address1`}
                control={form.control}
                render={({ field }) => (
                  <FormControl>
                    <FormItem className="w-full">
                      <FormLabel>Address 1</FormLabel>
                      <Input {...field} value={field.value} />
                    </FormItem>
                  </FormControl>
                )}
              />
              <FormField
                name={`customSections.items.${index}.address2`}
                control={form.control}
                render={({ field }) => (
                  <FormControl>
                    <FormItem className="w-full">
                      <FormLabel>Address 2</FormLabel>
                      <Input {...field} value={field.value} />
                    </FormItem>
                  </FormControl>
                )}
              />
            </div>

            <div className="flex w-full justify-between gap-5">
              <FormField
                name={`customSections.items.${index}.startDate`}
                control={form.control}
                render={({ field }) => (
                  <FormControl>
                    <FormItem className="w-full">
                      <FormLabel>Start Date</FormLabel>
                      <MonthYearPicker
                        {...field}
                        value={field.value}
                        format={DEFAULT_DATE_FORMAT}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormItem>
                  </FormControl>
                )}
              />
              <FormField
                name={`customSections.items.${index}.endDate`}
                control={form.control}
                render={({ field }) => (
                  <FormControl>
                    <FormItem className="w-full">
                      <FormLabel>End Date</FormLabel>
                      <MonthYearPicker
                        {...field}
                        value={field.value}
                        format={DEFAULT_DATE_FORMAT}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormItem>
                  </FormControl>
                )}
              />
            </div>

            <FormField
              name={`customSections.items.${index}.summary`}
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <FormItem className="w-full">
                    <FormLabel>Summary</FormLabel>
                    <Textarea {...field} value={field.value} />
                  </FormItem>
                </FormControl>
              )}
            />

            <div className="flex justify-end md:w-auto">
              <BtnDelete onClick={() => onDelete(index)} />
            </div>
          </div>
        ))}

        <div className="mt-5 flex w-full justify-end">
          <Button type="button" variant={"ghost"} onClick={() => append(CustomSectionDefault)}>
            + Add more custom section
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
