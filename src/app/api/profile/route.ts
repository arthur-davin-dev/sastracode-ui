import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

// GET USER PROFILE

export async function GET() {
  const result = await apiProxy("/profile");

  return NextResponse.json(result.data, {
    status: result.status,
  });
}

// UPDATE PROFILE

export async function PATCH(request: Request) {
  const body = await request.json();

  const result = await apiProxy("/profile", {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  return NextResponse.json(result.data, {
    status: result.status,
  });
}
