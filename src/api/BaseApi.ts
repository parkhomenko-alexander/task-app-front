export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const url = `${BASE_URL}${endpoint}`;
  const accessToken = localStorage.getItem("access_token");

  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  const headers: HeadersInit = accessToken
    ? { ...baseHeaders, Authorization: `Bearer ${accessToken}` }
    : baseHeaders;

  let res = await fetch(url, { ...options, headers });

  // Если токен просрочен
  if (res.status === 403 || res.status === 401) {
    console.warn("Access token expired, trying refresh...");

    const refreshRes = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      console.warn("Refresh failed, redirect to login");
      localStorage.removeItem("access_token");
      window.location.href = "/auth/login";
      throw new Error("Refresh token invalid");
    }

    const data = await refreshRes.json();
    console.log("Got new token:", data);

    // 🔑 Сохраняем новый access token
    localStorage.setItem("access_token", data.access_token);

    // 🔁 Перезапускаем оригинальный запрос с новым токеном
    const retryHeaders: HeadersInit = {
      ...baseHeaders,
      Authorization: `Bearer ${data.access_token}`,
    };

    res = await fetch(url, { ...options, headers: retryHeaders });
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  return res.json();
}
