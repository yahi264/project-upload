import { promises as fs } from "fs";
import path from "path";
import { requestSchema, type RequestInput } from "./request-schema";

export { requestSchema };
export type StoredRequest = Omit<RequestInput, "website"> & { id: string; createdAt: string };

const FILE = path.join(process.cwd(), "data", "requests.json");

export async function readRequests(): Promise<StoredRequest[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

export async function saveRequest(input: RequestInput): Promise<StoredRequest> {
  const { website: _honeypot, ...data } = input;
  const all = await readRequests();
  const date = new Date();
  const id = `HR-${date.toISOString().slice(2, 10).replace(/-/g, "")}-${String(all.length + 1).padStart(4, "0")}`;
  const stored: StoredRequest = { ...data, id, createdAt: date.toISOString() };
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify([stored, ...all], null, 2));
  return stored;
}
