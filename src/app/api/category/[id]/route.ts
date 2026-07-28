import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

// GET CATEGORY BY ID

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
  const result = await apiProxy(`/categories/${id}`);

  return NextResponse.json(result.data, {
    status: result.status,
  });
}