import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

// GET ALL CATEGORIES
export async function GET() {
  const result = await apiProxy("/categories");

  return NextResponse.json(result.data, {
    status: result.status,
  });
}

// CREATE CATEGORY (if needed later)
export async function POST(req: Request) {
  const body = await req.json();

  const result = await apiProxy("/categories", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return NextResponse.json(result.data, {
    status: result.status,
  });
}
