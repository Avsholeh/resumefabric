import BtnDelete from "@/components/shared/btn-delete";
import RatingStars from "@/components/shared/rating-stars";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SkillManyField } from "@/schema/skills";
import {
    Controller,
    type Control,
    type FieldArrayWithId,
    type UseFieldArrayRemove,
    type UseFormWatch,
} from "react-hook-form";

type SkillCardProps = {
    skill: FieldArrayWithId<SkillManyField>;
    index: number;
    control: Control<SkillManyField>;
    isDelete?: boolean;
    watch: UseFormWatch<SkillManyField>;
    remove: UseFieldArrayRemove;
};

export default function SkillCard({
    skill,
    index,
    control,
    isDelete,
    watch,
    remove,
}: SkillCardProps): React.ReactElement {
    return (
        <Card key={skill.id} className="mt-3 py-3">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                    <div className="flex w-full items-center gap-5">
                        <FormField
                            name={`skills.items.${index}.name`}
                            control={control}
                            defaultValue={skill.name}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div
                        className={cn(
                            "flex w-full items-center gap-5 md:w-auto",
                            !!watch("skills.showExperienceLevel") ? "justify-between" : "justify-end"
                        )}
                    >
                        {!!watch("skills.showExperienceLevel") && (
                            <Controller
                                name={`skills.items.${index}.experienceLevel`}
                                control={control}
                                defaultValue={skill.experienceLevel}
                                render={({ field }) => (
                                    <RatingStars
                                        onRatingChange={(value) => field.onChange(value)}
                                        defaultValue={field.value}
                                    />
                                )}
                            />
                        )}
                        <div className="flex justify-end md:w-auto">
                            <BtnDelete disabled={!isDelete} onClick={() => remove(index)} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
