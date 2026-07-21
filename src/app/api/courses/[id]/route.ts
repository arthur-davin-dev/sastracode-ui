import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  const result = await apiProxy(`/courses/${params.id}`);

  return NextResponse.json(result.data);
}
