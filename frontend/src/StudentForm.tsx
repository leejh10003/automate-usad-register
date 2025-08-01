import { useForm, useFieldArray, useController, type FieldValues, type UseControllerProps } from "react-hook-form"
import { Input } from "@/components/ui/input"
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
type School = { teams: Team[], schoolName?: string, schoolAddress?: string, principalName?: string, phoneNumber?: string, faxNumber?: string }
type FormValues = { school: School }

type CustomTextFieldProps<T extends FieldValues> = UseControllerProps<T>;

function CustomTextField<T extends FieldValues>({ control, name }: CustomTextFieldProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: { required: true }
  });

  return (
    <Input
      {...field}
    />
  );
}

export default function StudentForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      school: {
        teams: [],
        schoolName: "",
        schoolAddress: "",
        principalName: "",
        phoneNumber: "",
        faxNumber: ""
      }
    },
  })
  const { control, handleSubmit } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: "school.teams",
  })

  const onSubmit = (data: FormValues) => {
    console.log("학교", JSON.stringify(data))
  }

  const newStudentGroup: () => Student[] = () => Array.from({ length: 3 }, (_) => ({
    firstName: ``,
    lastName: ``,
    gpa: 0.0,
  }));
  const newTeam: () => Team = () => ({
    honors: newStudentGroup(),
    scholastic: newStudentGroup(),
    varsity: newStudentGroup(),
  })

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomTextField control={control} name="school.schoolName" />
        <CustomTextField control={control} name="school.schoolAddress" />
        <CustomTextField control={control} name="school.principalName" />
        <CustomTextField control={control} name="school.phoneNumber" />
        <CustomTextField control={control} name="school.faxNumber" />
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