import { useForm, useFieldArray, useController, type FieldValues, type UseControllerProps } from "react-hook-form"
import { Input } from "@/components/ui/input"
import TeamForm from "./TeamForm"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Checkbox, Select } from "radix-ui"
import { CheckIcon } from "@radix-ui/react-icons"
import CoachesForm from "./CoachForm"
import { useState } from "react"
import _ from "lodash"

type Student = { firstName: string; lastName: string; gpa: number }
type Team = {
  honors?: Student[]
  scholastic?: Student[]
  varsity?: Student[]
}
type SchoolGrade = '5th' | '6th' | '7th' | '8th' | '9th' | '10th' | '11th' | '12th';
type SchoolEnrollment = '9th' | '10th' | '11th' | '12th';
type School = {
  teams: Team[],
  coaches: Coach[],
  schoolName?: string,
  schoolStreetAddress?: string,
  schoolCity?: string,
  schoolState?: string,
  schoolZipCode?: string,
  principalName?: string,
  phoneNumber?: string,
  faxNumber?: string,
  grade: SchoolGrade[],
  schoolEnrollment?: SchoolEnrollment
}
type State =
  | "Alabama"
  | "Alaska"
  | "Arizona"
  | "Arkansas"
  | "California"
  | "Colorado"
  | "Connecticut"
  | "Delaware"
  | "Florida"
  | "Georgia"
  | "Hawaii"
  | "Idaho"
  | "Illinois"
  | "Indiana"
  | "Iowa"
  | "Kansas"
  | "Kentucky"
  | "Louisiana"
  | "Maine"
  | "Maryland"
  | "Massachusetts"
  | "Michigan"
  | "Minnesota"
  | "Mississippi"
  | "Missouri"
  | "Montana"
  | "Nebraska"
  | "Nevada"
  | "New Hampshire"
  | "New Jersey"
  | "New Mexico"
  | "New York"
  | "North Carolina"
  | "North Dakota"
  | "Ohio"
  | "Oklahoma"
  | "Oregon"
  | "Pennsylvania"
  | "Rhode Island"
  | "South Carolina"
  | "South Dakota"
  | "Tennessee"
  | "Texas"
  | "Utah"
  | "Vermont"
  | "Virginia"
  | "Washington"
  | "West Virginia"
  | "Wisconsin"
  | "Wyoming"
type StateWithAbbreviation = {
  state: State;
  abbrevation: string;
}
const statesWithAbbreviations: StateWithAbbreviation[] = [
  { state: "Alabama", abbrevation: "AL" },
  { state: "Alaska", abbrevation: "AK" },
  { state: "Arizona", abbrevation: "AZ" },
  { state: "Arkansas", abbrevation: "AR" },
  { state: "California", abbrevation: "CA" },
  { state: "Colorado", abbrevation: "CO" },
  { state: "Connecticut", abbrevation: "CT" },
  { state: "Delaware", abbrevation: "DE" },
  { state: "Florida", abbrevation: "FL" },
  { state: "Georgia", abbrevation: "GA" },
  { state: "Hawaii", abbrevation: "HI" },
  { state: "Idaho", abbrevation: "ID" },
  { state: "Illinois", abbrevation: "IL" },
  { state: "Indiana", abbrevation: "IN" },
  { state: "Iowa", abbrevation: "IA" },
  { state: "Kansas", abbrevation: "KS" },
  { state: "Kentucky", abbrevation: "KY" },
  { state: "Louisiana", abbrevation: "LA" },
  { state: "Maine", abbrevation: "ME" },
  { state: "Maryland", abbrevation: "MD" },
  { state: "Massachusetts", abbrevation: "MA" },
  { state: "Michigan", abbrevation: "MI" },
  { state: "Minnesota", abbrevation: "MN" },
  { state: "Mississippi", abbrevation: "MS" },
  { state: "Missouri", abbrevation: "MO" },
  { state: "Montana", abbrevation: "MT" },
  { state: "Nebraska", abbrevation: "NE" },
  { state: "Nevada", abbrevation: "NV" },
  { state: "New Hampshire", abbrevation: "NH" },
  { state: "New Jersey", abbrevation: "NJ" },
  { state: "New Mexico", abbrevation: "NM" },
  { state: "New York", abbrevation: "NY" },
  { state: "North Carolina", abbrevation: "NC" },
  { state: "North Dakota", abbrevation: "ND" },
  { state: "Ohio", abbrevation: "OH" },
  { state: "Oklahoma", abbrevation: "OK" },
  { state: "Oregon", abbrevation: "OR" },
  { state: "Pennsylvania", abbrevation: "PA" },
  { state: "Rhode Island", abbrevation: "RI" },
  { state: "South Carolina", abbrevation: "SC" },
  { state: "South Dakota", abbrevation: "SD" },
  { state: "Tennessee", abbrevation: "TN" },
  { state: "Texas", abbrevation: "TX" },
  { state: "Utah", abbrevation: "UT" },
  { state: "Vermont", abbrevation: "VT" },
  { state: "Virginia", abbrevation: "VA" },
  { state: "Washington", abbrevation: "WA" },
  { state: "West Virginia", abbrevation: "WV" },
  { state: "Wisconsin", abbrevation: "WI" },
  { state: "Wyoming", abbrevation: "WY" },
]
type FormValues = { school: School }
type CoachRole = 'primary' | 'alternate' | 'chaperon';
type Coach = { firstName: string; lastName: string; email: string; phoneNumber: string; role: CoachRole }

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

function SearchableSelect<T extends FieldValues, OptionType extends { value: string, displayString: string, searchString: string }>({ control, name, options, placeholderString }: CustomTextFieldProps<T> & { options: OptionType[], placeholderString: string }) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules: { required: true }
  });
  const [filteredOptions, setFilteredOptions] = useState<OptionType[]>(options);
  return <Select.Root {...field}>
    <Select.Trigger className="SelectTrigger">
      <Select.Value placeholder={placeholderString} />
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="SelectContent" position="popper" style={{padding: "8px"}}>
        <Input
          type="text"
          placeholder="Search..."
          className="SelectSearchInput"
          onChange={(input) => _.debounce(() => setFilteredOptions(options.filter((e) => e.searchString.toLowerCase().includes(input.target.value.trim().toLowerCase()))), 500)()}
          onKeyDown={(e) => e.stopPropagation()}
        />
        <Select.ScrollUpButton />
        <Select.Viewport className="SelectViewport">
          {filteredOptions.map((option) => (
            <Select.Item key={option.value} value={option.value} className="SelectItem">
              <Select.ItemText>{option.displayString}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select.Portal>
  </Select.Root>
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
        coaches: [
          {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            role: "primary",
          }
        ]
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
        <FormItem>
          <FormLabel>School address</FormLabel>
          <FormControl>
            <div className="flex gap-4">
              <CustomTextField placeholder="Street address" control={control} name="school.schoolStreetAddress" />
              <CustomTextField placeholder="City" control={control} name="school.schoolCity" />
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <SearchableSelect control={control} placeholderString="Select State..." name="school.schoolState" options={statesWithAbbreviations.map(state => ({
                    value: state.abbrevation,
                    displayString: state.state,
                    searchString: `${state.state.toLowerCase()} - ${state.abbrevation.toLowerCase()}`,
                  }))} />
                </FormControl>
              </FormItem>
              <CustomTextField placeholder="Zip code" control={control} name="school.schoolZipCode" />
            </div>
          </FormControl>
        </FormItem>
        <CustomTextField placeholder="Principal name" control={control} name="school.principalName" />
        <div className="flex gap-4 mt-2 items-center">
          <CustomTextField placeholder="School phone number" control={control} name="school.phoneNumber" />
          <CustomTextField placeholder="School fax number" control={control} name="school.faxNumber" />
        </div>
        <FormItem>
          <FormLabel>School grade</FormLabel>
          <FormControl>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
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
        <CoachesForm />
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