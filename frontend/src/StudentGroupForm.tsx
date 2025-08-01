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
      <h3 className="font-semibold">{groupName}</h3>

      {fields.map((_, studentIndex) => (
        <div key={studentIndex} className="flex gap-4 mt-2 items-center">
          <FormField
            control={control}
            name={`school.teams.${teamIndex}.${groupName}.${studentIndex}.name`}
            render={(_) => (<div className="flex gap-4">
              <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Name"
                  {...register(`school.teams.${teamIndex}.${groupName}.${studentIndex}.name`)}
                />
              </FormControl>
              <FormDescription>
                This is your student's legal name.
              </FormDescription>
              <FormMessage />
              </FormItem>
              <FormItem>
              <FormLabel>GPA</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
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
      >
        Add student
      </Button>
    </div>
  )
}