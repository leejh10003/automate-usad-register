import { useFieldArray, useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function StudentGroupForm({
  teamIndex,
  groupName,
}: {
  teamIndex: number
  groupName: "varsity" | "scholastic" | "honors"
}) {
  const { control, register } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `school.teams.${teamIndex}.${groupName}`,
  })

  return (
    <div className="mt-4 gap-1">
      <h3 className="font-semibold">{groupName.replace(/(?<=^|[.?!;:]\s*)\w/g, (char) => char.toUpperCase())}</h3>

      {fields.map((_, studentIndex) => (
        <div key={studentIndex} className="flex gap-4 mt-2 items-center">
          <FormField
            control={control}
            name={`school.teams.${teamIndex}.${groupName}.${studentIndex}`}
            render={(_) => (<div className="flex gap-4">
              <FormItem>
              <FormLabel>Fist Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="First Name"
                  {...register(`school.teams.${teamIndex}.${groupName}.${studentIndex}.firstName`)}
                />
              </FormControl>
              <FormDescription>
                This is your student's legal first name.
              </FormDescription>
              <FormMessage />
              </FormItem>
              <FormItem>
              <FormLabel>Fist Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Last Name"
                  {...register(`school.teams.${teamIndex}.${groupName}.${studentIndex}.lastName`)}
                />
              </FormControl>
              <FormDescription>
                This is your student's legal last name.
              </FormDescription>
              <FormMessage />
              </FormItem>
              <FormItem>
              <FormLabel>GPA</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.001"
                  placeholder="GPA"
                  {...register(`school.teams.${teamIndex}.${groupName}.${studentIndex}.gpa`, {
                    valueAsNumber: true,
                  })}
                />
              </FormControl>
              <FormDescription>
                This is your student's GPA.
              </FormDescription>
              <FormMessage />
            </FormItem>
            </div>)}
          />
          <Button
            type="button"
            variant="link"
            className="text-red-500 hover:text-red-600"
            onClick={() => remove(studentIndex)}
          >
            Delete student
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="link"
        onClick={() => append({ name: "", gpa: 0 })}
        disabled={fields.length >= 3}
      >
        Add student
      </Button>
    </div>
  )
}