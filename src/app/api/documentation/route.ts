import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const courseId = searchParams.get("courseId");

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/courses/${courseId}/playlists`,
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Get playlist failed",
      },
      {
        status: 500,
      },
    );
  }
}
