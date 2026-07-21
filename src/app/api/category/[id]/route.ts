import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

// GET CATEGORY BY ID

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
  const result = await apiProxy(`/categories/${params.id}`);

  return NextResponse.json(result.data, {
    status: result.status,
  });
}
