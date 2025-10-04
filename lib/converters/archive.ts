import path from "path";
import { readFile, writeFile, mkdir } from "fs/promises";
import archiver from "archiver";
import AdmZip from "adm-zip";
import { createWriteStream } from "fs";
import type { ConversionJobData } from "@/lib/jobs";

// Create ZIP from file
export async function createZipFromFile(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  
  return new Promise<{ outputPath: string }>((resolve, reject) => {
    const output = createWriteStream(targetPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve({ outputPath: targetPath }));
    archive.on('error', (err) => reject(err));

    archive.pipe(output);
    archive.file(job.sourcePath, { name: path.basename(job.sourcePath) });
    archive.finalize();
  });
}

// Extract ZIP and return first file as target format
export async function extractZipToFile(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const zip = new AdmZip(job.sourcePath);
  const zipEntries = zip.getEntries();
  
  if (zipEntries.length > 0) {
    const firstFile = zipEntries[0];
    const content = firstFile.getData();
    await writeFile(targetPath, content);
  } else {
    throw new Error('ZIP file is empty');
  }
  
  return { outputPath: targetPath };
}

// List ZIP contents as TXT
export async function zipToTxt(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const zip = new AdmZip(job.sourcePath);
  const zipEntries = zip.getEntries();
  
  let content = `ZIP Archive Contents:\n\n`;
  zipEntries.forEach((entry) => {
    content += `${entry.entryName} - ${entry.header.size} bytes\n`;
  });
  
  await writeFile(targetPath, content);
  return { outputPath: targetPath };
}
