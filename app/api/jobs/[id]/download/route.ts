import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import mime from "mime";
import { readJobStatus } from "@/lib/storage";
import { env } from "@/lib/env";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: Params) {
  const jobStatus = await readJobStatus(params.id);

  if (!jobStatus) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (jobStatus.status !== "completed") {
    return NextResponse.json({ error: "Job is not completed" }, { status: 409 });
  }

  if (!jobStatus.outputPath) {
    return NextResponse.json({ error: "Output not available" }, { status: 404 });
  }

  const fileBuffer = await readFile(jobStatus.outputPath);
  const filename = path.basename(jobStatus.outputPath);
  const mimeType = mime.getType(jobStatus.outputPath) ?? "application/octet-stream";

  return new NextResponse(fileBuffer as unknown as BodyInit, {
    headers: {
      "Content-Type": mimeType,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
      "Content-Length": `${fileBuffer.byteLength}`
    }
  });
}
