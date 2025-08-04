import { useFieldArray, useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel } from "./components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CoachesForm() {
    const { control, register } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "school.coaches",
    });
    return (
        <div className="mt-4 gap-1">
            <h3 className="font-semibold">Coaches</h3>
            {fields.map((_, coachIndex) => (
                <CoachForm key={coachIndex} coachIndex={coachIndex} />
            ))}
            <Button
                type="button"
                variant="link"
                onClick={() => append({ name: "" })}
            >
                Add coach
            </Button>
        </div>
    )
}

export function CoachForm({
    coachIndex,
}: {
    coachIndex: number
}) {
    const { control, register } = useFormContext()
    return (
        <div className="mt-4 gap-1">
            <h4 className="font-semibold">Coach {coachIndex + 1}</h4>
            <FormField
                control={control}
                name={`school.coaches.${coachIndex}.name`}
                render={(_) => (<div className="flex gap-4 mt-2 items-center">
                    <FormItem>
                        <FormLabel>Coach First Name</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="First Name"
                                {...register(`school.coaches.${coachIndex}.firstName`)}
                            />
                        </FormControl>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Coach Last Name</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="Last Name"
                                {...register(`school.coaches.${coachIndex}.lastName`)}
                            />
                        </FormControl>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Coach Email</FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="Email"
                                {...register(`school.coaches.${coachIndex}.email`)}
                            />
                        </FormControl>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Coach Phone Number</FormLabel>
                        <FormControl>
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                {...register(`school.coaches.${coachIndex}.phoneNumber`)}
                            />
                        </FormControl>
                    </FormItem>
                </div>)} />
        </div>
    )
}