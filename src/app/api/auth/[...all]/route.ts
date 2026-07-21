import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      all: string[];
    };
  },
) {
  const endpoint = "/" + params.all.join("/");

  const response = await fetch(`${process.env.BACKEND_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
