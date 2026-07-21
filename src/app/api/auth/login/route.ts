import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await apiProxy("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return NextResponse.json(result.data, {
    status: result.status,
  });
}
