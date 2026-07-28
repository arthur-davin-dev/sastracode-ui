import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const { id } = await params;
  const result = await apiProxy(`/courses/${id}`);

  return NextResponse.json(result.data);
}