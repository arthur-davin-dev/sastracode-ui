import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const courseId = url.searchParams.get("courseId");

  const result = await apiProxy(`/courses/${courseId}/playlists`);

  return NextResponse.json(result.data);
}
