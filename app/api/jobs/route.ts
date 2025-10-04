import { randomUUID } from "node:crypto";
import path from "path";
import { NextResponse } from "next/server";
import { buildJobData } from "@/lib/jobs";
import { writeJobFile, writeJobStatus } from "@/lib/storage";
import { getToolBySlug } from "@/lib/tools";
import { getConverter } from "@/lib/converters";
import type { ConversionJobResponse } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const toolSlug = formData.get("toolSlug");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "A file is required" }, { status: 400 });
    }

    if (!toolSlug || typeof toolSlug !== "string") {
      return NextResponse.json({ error: "A tool slug is required" }, { status: 400 });
    }

    const tool = getToolBySlug(toolSlug);

    if (!tool) {
      return NextResponse.json({ error: "Unknown conversion tool" }, { status: 404 });
    }

    const extension = path.extname(file.name).toLowerCase();

    if (!tool.sourceExtensions.includes(extension)) {
      return NextResponse.json(
        { error: `This tool accepts: ${tool.sourceExtensions.join(", ")}` },
        { status: 400 }
      );
    }

    const jobId = randomUUID();
    const arrayBuffer = await file.arrayBuffer();
    const sourcePath = await writeJobFile(jobId, file.name, arrayBuffer);
    const jobData = buildJobData({ jobId, filePath: sourcePath, filename: file.name, tool });

    // Write initial status
    await writeJobStatus(jobId, { status: "processing", progress: 0 });

    // Process conversion synchronously
    try {
      const converter = getConverter(tool.converter);
      if (!converter) {
        throw new Error(`No converter found for ${tool.converter}`);
      }

      const result = await converter(jobData);
      
      // Write completion status
      await writeJobStatus(jobId, {
        status: "completed",
        progress: 100,
        outputPath: result.outputPath
      });

      const payload: ConversionJobResponse = {
        jobId,
        status: "completed",
        downloadUrl: `/api/jobs/${jobId}/download`
      };

      return NextResponse.json(payload, { status: 201 });
    } catch (conversionError) {
      console.error("Conversion failed:", conversionError);
      
      // Write error status
      await writeJobStatus(jobId, {
        status: "failed",
        progress: 0,
        error: conversionError instanceof Error ? conversionError.message : "Conversion failed"
      });

      return NextResponse.json(
        { error: "Conversion failed", details: conversionError instanceof Error ? conversionError.message : "Unknown error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Failed to create job", error);
    return NextResponse.json({ error: "Failed to create conversion job" }, { status: 500 });
  }
}
