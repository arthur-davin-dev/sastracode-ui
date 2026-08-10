export async function apiProxy(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${process.env.BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json();

  return {
    data,
    status: response.status,
  };
}
