import { signIn } from "@/auth";
import { NextRequest } from "next/server";

function getSafeCallbackUrl(request: NextRequest) {
  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");

  return callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
    ? callbackUrl
    : "/";
}

export async function GET(request: NextRequest) {
  await signIn("keycloak", {
    redirectTo: getSafeCallbackUrl(request),
  });
}
