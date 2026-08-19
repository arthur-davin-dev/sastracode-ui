import { Suspense } from "react";
import Editor from "@/components/playground/Editor";

export default function EditorPage() {
  return (
    <Suspense fallback={null}>
      <Editor />
    </Suspense>
  );
}
