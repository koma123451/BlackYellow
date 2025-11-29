const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)
export async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options,
  });

  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}
