/**
 * HTTP client for the FastAPI backend.
 *
 * Base URL comes from VITE_API_URL (see .env.example). Admin requests carry a
 * bearer token that is stored in localStorage after a successful sign in.
 */

const RAW_BASE = import.meta.env["VITE_API_URL"] ?? "http://localhost:8000";
export const API_BASE = RAW_BASE.replace(/\/$/, "");

const TOKEN_KEY = "mm_admin_token";

export const isBrowser = () => typeof window !== "undefined";

export function getToken(): string | null {
  return isBrowser() ? localStorage.getItem(TOKEN_KEY) : null;
}

export function setToken(token: string | null) {
  if (!isBrowser()) return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** FastAPI returns `detail` as a string, or as a list of validation issues. */
async function readError(response: Response): Promise<string> {
  try {
    const body = await response.json();
    const detail = body?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return detail
        .map((d: { loc?: unknown[]; msg?: string }) =>
          [d.loc?.slice(1).join("."), d.msg].filter(Boolean).join(": "),
        )
        .join(", ");
    }
  } catch {
    /* non-JSON error body */
  }
  return response.statusText || `Request failed (${response.status})`;
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  auth?: boolean;
}

async function request<T>(path: string, { method = "GET", body, auth }: RequestOptions = {}) {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  } catch {
    throw new ApiError("Cannot reach the server. Check your connection and try again.", 0);
  }

  if (response.status === 401 && auth) {
    setToken(null);
    throw new ApiError(await readError(response), 401);
  }
  if (!response.ok) throw new ApiError(await readError(response), response.status);
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body }),
  adminGet: <T>(path: string) => request<T>(path, { auth: true }),
  adminPost: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body, auth: true }),
  adminPatch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body, auth: true }),
  adminPut: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body, auth: true }),
  adminDelete: (path: string) => request<void>(path, { method: "DELETE", auth: true }),
};

export interface UploadResult {
  url: string;
  publicId: string;
  resourceType: "image" | "video" | string;
  type: "image" | "video";
  thumbnailUrl: string;
  bytes: number;
  format: string;
}

/** Uploads one file to Cloudinary through the backend and returns its public URL. */
export async function uploadMedia(file: File, folder = ""): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);

  const token = getToken();
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api/admin/uploads`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
  } catch {
    throw new ApiError("Upload failed — the server is unreachable.", 0);
  }
  if (!response.ok) throw new ApiError(await readError(response), response.status);
  return (await response.json()) as UploadResult;
}
