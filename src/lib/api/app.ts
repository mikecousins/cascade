import { qbitText } from "./client";

export async function getVersion(): Promise<string> {
  return qbitText("/app/version");
}

export async function getApiVersion(): Promise<string> {
  return qbitText("/app/webapiVersion");
}
