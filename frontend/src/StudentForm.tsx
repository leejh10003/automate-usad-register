import { useForm, useFieldArray } from "react-hook-form"
import TeamForm from "./TeamForm"
import {
  Form,
} from "@/components/ui/form"

type Student = { firstName: string; lastName: string; gpa: number }
type Team = {
  honors?: Student[]
  scholastic?: Student[]
  varsity?: Student[]
}
type School = { teams: Team[] }
type FormValues = { school: School }

export default function StudentForm() {
  const methods = useForm<FormValues>({
    defaultValues: { school: { teams: [] } },
  })
  const { control, handleSubmit } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: "school.teams",
  })

  const onSubmit = (data: FormValues) => {
    console.log("학교", JSON.stringify(data))
  }

  const newStudentGroup: () => Student[] = () => Array.from({ length: 3 }, (_, i) => ({
    firstName: `Student ${i + 1}`,
    lastName: `Last ${i + 1}`,
    gpa: 4.0,
  }));
  const newTeam: () => Team = () => ({
    honors: newStudentGroup(),
    scholastic: newStudentGroup(),
    varsity: newStudentGroup(),
  })

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <TeamForm key={field.id} teamIndex={index} removeTeam={remove} />
        ))}

        <button
          type="button"
          onClick={() =>
            append(newTeam())
          }
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Team
        </button>

        <div className="mt-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </Form>
  )
}