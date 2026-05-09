import { QbitError, qbitPostForm } from "./client";
import type { LoginCredentials } from "./types";

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid username or password");
    this.name = "InvalidCredentialsError";
  }
}

export class IpBannedError extends Error {
  constructor() {
    super("This IP is temporarily banned after too many failed login attempts");
    this.name = "IpBannedError";
  }
}

export async function login({
  username,
  password,
}: LoginCredentials): Promise<void> {
  let res: Response;
  try {
    res = await qbitPostForm("/auth/login", { username, password });
  } catch (err) {
    if (err instanceof QbitError && err.status === 403) {
      throw new IpBannedError();
    }
    throw err;
  }

  const body = (await res.text()).trim();
  if (body !== "Ok.") {
    throw new InvalidCredentialsError();
  }
}

export async function logout(): Promise<void> {
  await qbitPostForm("/auth/logout", {});
}
