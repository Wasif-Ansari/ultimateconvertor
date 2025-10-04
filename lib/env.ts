export const env = {
  uploadDir: process.env.UPLOADS_DIR ?? `${process.cwd()}/uploads`,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
} as const;
