import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

export async function GET() {
  const result = await apiProxy("/bookmarks");

  return NextResponse.json(result.data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const result = await apiProxy("/bookmarks", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return NextResponse.json(result.data);
}
