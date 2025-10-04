import { NextResponse } from "next/server";
import { readJobStatus } from "@/lib/storage";
import type { ConversionJobResponse } from "@/lib/types";

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

  const payload: ConversionJobResponse = {
    jobId: params.id,
    status: jobStatus.status,
    downloadUrl: jobStatus.status === "completed" ? `/api/jobs/${params.id}/download` : undefined,
    error: jobStatus.error
  };

  return NextResponse.json(payload);
}
