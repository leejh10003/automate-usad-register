import { useFieldArray, useFormContext } from "react-hook-form"
import StudentGroupForm from "./StudentGroupForm"

export default function TeamForm({ teamIndex, removeTeam }: { teamIndex: number; removeTeam: (i: number) => void }) {
  const { control } = useFormContext()

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold text-lg">Team {teamIndex + 1}</h2>

      {(["varsity", "scholastic", "honors"] as const).map((group) => (
        <StudentGroupForm key={group} teamIndex={teamIndex} groupName={group} />
      ))}

      <button
        type="button"
        onClick={() => removeTeam(teamIndex)}
        className="mt-4 text-red-500"
      >
        Delete Team
      </button>
    </div>
  )
}