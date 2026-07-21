import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const playlistId = searchParams.get("playlistId");

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/playlists/${playlistId}/videos`,
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Get videos failed",
      },
      {
        status: 500,
      },
    );
  }
}
