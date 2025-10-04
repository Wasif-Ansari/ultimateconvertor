import path from "path";
import sharp from "sharp";
import type { ConversionJobData } from "@/lib/jobs";

// JPG conversions
export async function convertJpgToPng(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).png().toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertJpgToWebp(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).webp({ quality: 90 }).toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertJpgToTiff(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).tiff().toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertJpgToAvif(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).avif({ quality: 90 }).toFile(targetPath);
  return { outputPath: targetPath };
}

// PNG conversions
export async function convertPngToJpg(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).jpeg({ quality: 90 }).toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertPngToWebp(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).webp({ quality: 90 }).toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertPngToTiff(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).tiff().toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertPngToAvif(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).avif({ quality: 90 }).toFile(targetPath);
  return { outputPath: targetPath };
}

// WEBP conversions
export async function convertWebpToPng(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).png().toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertWebpToJpg(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).jpeg({ quality: 90 }).toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertWebpToTiff(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).tiff().toFile(targetPath);
  return { outputPath: targetPath };
}

// TIFF conversions
export async function convertTiffToPng(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).png().toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertTiffToJpg(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).jpeg({ quality: 90 }).toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertTiffToWebp(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).webp({ quality: 90 }).toFile(targetPath);
  return { outputPath: targetPath };
}

// AVIF conversions
export async function convertAvifToPng(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).png().toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertAvifToJpg(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).jpeg({ quality: 90 }).toFile(targetPath);
  return { outputPath: targetPath };
}

export async function convertAvifToWebp(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath).webp({ quality: 90 }).toFile(targetPath);
  return { outputPath: targetPath };
}

// Image resize/optimize
export async function resizeImage(job: ConversionJobData, width: number, height?: number) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  await sharp(job.sourcePath)
    .resize(width, height, { fit: 'inside', withoutEnlargement: true })
    .toFile(targetPath);
  return { outputPath: targetPath };
}
