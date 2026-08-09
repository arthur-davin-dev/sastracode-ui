import { auth } from "@/auth";

export class BackendProxyError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);

    this.name = "BackendProxyError";
    this.status = status;
  }
}

export async function backendFetch(path: string, options: RequestInit = {}) {
  const apiUrl = process.env.BACKEND_API_URL;

  if (!apiUrl) {
    throw new BackendProxyError(500, "Backend API configuration is missing.");
  }

  const session = await auth();

  if (!session || !session.accessToken) {
    throw new BackendProxyError(401, "Unauthorized");
  }

  if (session.error === "RefreshAccessTokenError") {
    throw new BackendProxyError(401, "Session expired");
  }

  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${session.accessToken}`);

  headers.set("Accept", "application/json");

  const baseUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;

  const finalPath = path.startsWith("/") ? path : `/${path}`;

  return fetch(`${baseUrl}${finalPath}`, {
    ...options,

    headers,

    cache: "no-store",
  });
}

export async function parseBackendResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {
      success: response.ok,

      message: response.ok ? "Success" : "Request failed",

      data: null,
    };
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      success: false,

      message: text || "Invalid backend response",

      data: null,
    };
  }
}
