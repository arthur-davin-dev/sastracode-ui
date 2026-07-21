import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

export async function GET() {
  const result = await apiProxy("/notifications");

  return NextResponse.json(result.data);
}
