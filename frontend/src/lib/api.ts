const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function request<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(opts.headers as any) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed: ${res.status}`);
  return data as T;
}

export const api = {
  get: <T = any>(path: string, token?: string) => request<T>(path, { method: 'GET', headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  post: <T = any>(path: string, body: any, token?: string) => request<T>(path, { method: 'POST', body: JSON.stringify(body), headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  put: <T = any>(path: string, body: any, token?: string) => request<T>(path, { method: 'PUT', body: JSON.stringify(body), headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  patch: <T = any>(path: string, body: any, token?: string) => request<T>(path, { method: 'PATCH', body: JSON.stringify(body), headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  delete: <T = any>(path: string, token?: string) => request<T>(path, { method: 'DELETE', headers: token ? { Authorization: `Bearer ${token}` } : {} }),
};

export const tokenStore = {
  get: () => (typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null),
  set: (t: string) => typeof window !== 'undefined' && localStorage.setItem('admin_token', t),
  clear: () => typeof window !== 'undefined' && localStorage.removeItem('admin_token'),
};