import type { ConversionToolDefinition } from "@/lib/types";

export interface ConversionJobData {
  jobId: string;
  toolSlug: string;
  sourcePath: string;
  sourceFilename: string;
  targetFilename: string;
  targetExtension: string;
  converter: string;
  createdAt: number;
}

export interface ConversionJobResult {
  jobId: string;
  outputPath: string;
  processedAt: number;
  durationMs: number;
}

export function buildJobData(options: {
  jobId: string;
  filePath: string;
  filename: string;
  tool: ConversionToolDefinition;
}): ConversionJobData {
  const { jobId, filePath, filename, tool } = options;
  const targetFilename = deriveTargetFilename(filename, tool.targetExtension);
  return {
    jobId,
    toolSlug: tool.slug,
    sourcePath: filePath,
    sourceFilename: filename,
    targetFilename,
    targetExtension: tool.targetExtension,
    converter: tool.converter,
    createdAt: Date.now()
  };
}

export function deriveTargetFilename(sourceFilename: string, targetExtension: string) {
  const sanitizedExtension = targetExtension.startsWith(".") ? targetExtension : `.${targetExtension}`;
  const base = sourceFilename.replace(/\.[^.]+$/, "");
  return `${base}${sanitizedExtension}`;
}
