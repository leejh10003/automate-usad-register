import StudentForm from "./StudentForm";
import { Theme, TextField } from "@radix-ui/themes"

export default () => <Theme><div className="min-h-screen flex flex-col">
  {/* 상단 포스터 */}
  <div className="h-60 bg-gray-200" />

  {/* 폼 영역 */}
  <div className="flex-1 flex justify-center px-4">
    <div className="w-full max-w-3xl mt-8">
      <StudentForm />
    </div>
  </div>
</div>
</Theme>;