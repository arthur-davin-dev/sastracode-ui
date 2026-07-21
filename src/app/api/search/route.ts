import { NextResponse } from "next/server";
import { apiProxy } from "@/lib/api/proxy";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const keyword = url.searchParams.get("q");

  const result = await apiProxy(`/search?q=${keyword}`);

  return NextResponse.json(result.data);
}
