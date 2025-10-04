export type ConversionCategoryKey =
  | "images"
  | "videos"
  | "audio"
  | "documents"
  | "spreadsheets"
  | "presentations"
  | "ebooks"
  | "archives"
  | "ocr";

export interface ConversionToolDefinition {
  slug: string;
  label: string;
  description: string;
  sourceExtensions: string[];
  targetExtension: string;
  category: ConversionCategoryKey;
  converter: string;
}

export interface ConversionCategory {
  key: ConversionCategoryKey;
  title: string;
  description: string;
  accentColor: string;
}

export type ConversionJobStatus = "processing" | "completed" | "failed";

export interface ConversionJobResponse {
  jobId: string;
  status: ConversionJobStatus;
  downloadUrl?: string;
  error?: string;
}
