import { mkdir, stat, writeFile, readFile } from "fs/promises";
import path from "path";
import { env } from "@/lib/env";

export async function ensureJobDirectory(jobId: string) {
  const jobDir = path.join(env.uploadDir, jobId);
  await mkdir(jobDir, { recursive: true });
  return jobDir;
}

export async function writeJobFile(jobId: string, filename: string, data: ArrayBuffer) {
  const jobDir = await ensureJobDirectory(jobId);
  const filePath = path.join(jobDir, filename);
  await writeFile(filePath, new Uint8Array(data));
  return filePath;
}

export function resolveJobPath(jobId: string, filename: string) {
  return path.join(env.uploadDir, jobId, filename);
}

export async function fileExists(filePath: string) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if ((error as { code?: string }).code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

export interface JobStatus {
  status: "processing" | "completed" | "failed";
  progress: number;
  outputPath?: string;
  error?: string;
}

export async function writeJobStatus(jobId: string, status: JobStatus) {
  const jobDir = await ensureJobDirectory(jobId);
  const statusPath = path.join(jobDir, "status.json");
  await writeFile(statusPath, JSON.stringify(status, null, 2));
}

export async function readJobStatus(jobId: string): Promise<JobStatus | null> {
  try {
    const statusPath = path.join(env.uploadDir, jobId, "status.json");
    const content = await readFile(statusPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if ((error as { code?: string }).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}
