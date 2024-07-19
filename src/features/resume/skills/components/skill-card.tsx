import BtnDelete from "@/components/shared/btn-delete";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Controller,
    type Control,
    type FieldArrayWithId,
    type UseFieldArrayRemove,
    type UseFormWatch,
} from "react-hook-form";
import { type SkillArrayField } from "../schema";
import RatingStars from "./rating-stars";

type SkillCardProps = {
    skill: FieldArrayWithId<SkillArrayField>;
    index: number;
    control: Control<SkillArrayField>;
    isDelete?: boolean;
    watch: UseFormWatch<SkillArrayField>;
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
        <div key={skill.id} className="card bg-base-100 mt-3 w-full border border-slate-300 py-3">
            <div className="card-body p-4">
                <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                    <div>#{index + 1}</div>
                    <label className="form-control w-full">
                        <FormField
                            name={`skills.${index}.name`}
                            control={control}
                            defaultValue={skill.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </label>
                    {!!watch("showExperienceLevel") && (
                        <Controller
                            name={`skills.${index}.experienceLevel`}
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
                    <div className="flex w-full justify-end md:w-auto">
                        <BtnDelete disabled={!isDelete} onClick={() => remove(index)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
