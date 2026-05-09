const API_BASE = "/api/v2";

export class QbitError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string, message?: string) {
    super(message ?? `qBittorrent API error (${status})`);
    this.name = "QbitError";
    this.status = status;
    this.body = body;
  }
}

async function readBody(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

export async function qbitFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await readBody(res);
    throw new QbitError(res.status, body);
  }

  return res;
}

export async function qbitJson<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await qbitFetch(path, init);
  return (await res.json()) as T;
}

export async function qbitText(
  path: string,
  init?: RequestInit
): Promise<string> {
  const res = await qbitFetch(path, init);
  return await res.text();
}

export async function qbitPostForm(
  path: string,
  params: Record<string, string | number | boolean | undefined>
): Promise<Response> {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    body.set(key, String(value));
  }

  return qbitFetch(path, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
