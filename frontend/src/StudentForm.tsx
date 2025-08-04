import { useForm, useFieldArray, useController, type FieldValues, type UseControllerProps } from "react-hook-form"
import { Input } from "@/components/ui/input"
import TeamForm from "./TeamForm"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Checkbox } from "radix-ui"
import { CheckIcon } from "@radix-ui/react-icons"

type Student = { firstName: string; lastName: string; gpa: number }
type Team = {
  honors?: Student[]
  scholastic?: Student[]
  varsity?: Student[]
}
type SchoolGrade = '5th' | '6th' | '7th' | '8th' | '9th' | '10th' | '11th' | '12th';
type SchoolEnrollment = '9th' | '10th' | '11th' | '12th';
type School = { teams: Team[], schoolName?: string, schoolAddress?: string, principalName?: string, phoneNumber?: string, faxNumber?: string, grade: SchoolGrade[], schoolEnrollment?: SchoolEnrollment }
type FormValues = { school: School }

type CustomTextFieldProps<T extends FieldValues> = UseControllerProps<T>;

function CustomTextField<T extends FieldValues>({ control, name, placeholder }: CustomTextFieldProps<T> & { placeholder: string }) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: { required: true }
  });

  return (
    <FormItem>
      <FormLabel>{placeholder}</FormLabel>
      <FormControl>
        <Input
          placeholder={placeholder}
          {...field}
        />
      </FormControl>
    </FormItem>
  );
}

function CustomCheckBox<T extends FieldValues>({ control, name, value }: CustomTextFieldProps<T> & { value: string }) {
  const {
    field,
  } = useController({
    name,
    control,
  });

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox.Root
        className="CheckboxRoot"
        value={value}
        checked={field.value.includes(value)}
        onCheckedChange={(checked) => {
          if (checked) {
            field.onChange([...field.value, value]);
          } else {
            field.onChange(field.value.filter((v: string) => v !== value));
          }
        }}
      >
        <Checkbox.Indicator className="CheckboxIndicator">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="Label" htmlFor={`school-grade-${value}`}>
        {value}
      </label>
    </div>
  );
}

export default function StudentForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      school: {
        teams: [{
          honors: Array.from({ length: 3 }, () => ({ firstName: "", lastName: "", gpa: 0 })),
          scholastic: Array.from({ length: 3 }, () => ({ firstName: "", lastName: "", gpa: 0 })),
          varsity: Array.from({ length: 3 }, () => ({ firstName: "", lastName: "", gpa: 0 })),
        }],
        schoolName: "",
        schoolAddress: "",
        principalName: "",
        phoneNumber: "",
        faxNumber: "",
        grade: [],
      } as School
    },
  })
  const { control, handleSubmit } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: "school.teams",
  })

  const onSubmit = (data: FormValues) => {
    console.log("학교", data)
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
        <h2 className="text-2xl font-bold mb-4">School basic information</h2>
        <CustomTextField placeholder="School name" control={control} name="school.schoolName" />
        <CustomTextField placeholder="School Address" control={control} name="school.schoolAddress" />
        <CustomTextField placeholder="Principal name" control={control} name="school.principalName" />
        <CustomTextField placeholder="School phone number" control={control} name="school.phoneNumber" />
        <CustomTextField placeholder="School fax number" control={control} name="school.faxNumber" />
        <FormItem>
          <FormLabel>School grade</FormLabel>
          <FormControl>
            <div style={{display: "flex", flexWrap: "wrap", gap: "24px"}}>
            {["5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"].map((grade) => (
              <CustomCheckBox
                key={grade}
                control={control}
                name="school.grade"
                value={grade as SchoolGrade}
              />
            ))}
            </div>
          </FormControl>
        </FormItem>
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