import RatingStars from "@/components/shared/rating-stars";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useClickOutside } from "@/hooks/use-click-outside";
import { CheckIcon, PencilIcon } from "lucide-react";
import { useRef, useState } from "react";
import { FieldArrayWithId, useFormContext } from "react-hook-form";
import { SoftwareSchemaField } from "../schema";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    fields: FieldArrayWithId<SoftwareSchemaField>[];
};

export default function SoftwareForm({ fields }: Props): React.ReactElement {
    const form = useFormContext();
    const [isEdit, setIsEdit] = useState(false);
    const titleRef = useRef(null);

    useClickOutside(titleRef, () => setIsEdit(false));

    return (
        <Card className="mb-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {isEdit ? (
                        <>
                            <FormField
                                name={`software.section`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem ref={titleRef}>
                                        <Input {...field} value={field.value} />
                                    </FormItem>
                                )}
                            />
                            <Button variant={"ghost"} size={"sm"} onClick={() => setIsEdit(!isEdit)}>
                                <CheckIcon className="h-4 w-4" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <span className="mr-3">{form.watch("software.section")}</span>
                            <Button variant={"ghost"} size={"sm"} onClick={() => setIsEdit(!isEdit)}>
                                <PencilIcon className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {fields.map((field, index) => (
                    <div key={field.id} className="mb-3 flex items-center gap-5">
                        <FormField
                            name={`software.items.${index}.name`}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Input {...field} value={field.value} />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`software.items.${index}.level`}
                            control={form.control}
                            render={({ field }) => (
                                <RatingStars
                                    onRatingChange={(value) => field.onChange(value)}
                                    defaultValue={field.value}
                                />
                            )}
                        />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
