import { useFieldArray, useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

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
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="First Name"
                  {...register(`school.teams.${teamIndex}.${groupName}.${studentIndex}.firstName`)}
                />
              </FormControl>
              <FormMessage />
              </FormItem>
              <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Last Name"
                  {...register(`school.teams.${teamIndex}.${groupName}.${studentIndex}.lastName`)}
                />
              </FormControl>
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
                    min: 0.0,
                    max: 5.0,
                    onChange: (e) => {
                      const value = parseFloat(e.target.value)
                      if (isNaN(value)) {
                        e.target.value = "0.0"
                      }
                      const splitted = e.target.value.split('.')
                      if (splitted.length > 1 && splitted[1].length > 3) {
                        e.target.value = value.toFixed(3) // Limit to 3 decimal places
                      }
                    }
                  })}
                />
              </FormControl>
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
        style={{ visibility: fields.length >= 3 ? "hidden" : "visible" }}
        disabled={fields.length >= 3}
      >
        Add student
      </Button>
    </div>
  )
}