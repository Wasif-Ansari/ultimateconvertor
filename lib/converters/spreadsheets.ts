import path from "path";
import { readFile, writeFile } from "fs/promises";
import * as XLSX from "xlsx";
import type { ConversionJobData } from "@/lib/jobs";

// XLSX to other formats
export async function convertXlsxToCsv(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const csv = XLSX.utils.sheet_to_csv(firstSheet);
  await writeFile(targetPath, csv);
  return { outputPath: targetPath };
}

export async function convertXlsxToTxt(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const text = XLSX.utils.sheet_to_txt(firstSheet);
  await writeFile(targetPath, text);
  return { outputPath: targetPath };
}

export async function convertXlsxToHtml(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const html = XLSX.utils.sheet_to_html(firstSheet);
  await writeFile(targetPath, html);
  return { outputPath: targetPath };
}

export async function convertXlsxToJson(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(firstSheet);
  await writeFile(targetPath, JSON.stringify(json, null, 2));
  return { outputPath: targetPath };
}

// CSV to other formats
export async function convertCsvToXlsx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const csvContent = await readFile(job.sourcePath, 'utf-8');
  const workbook = XLSX.read(csvContent, { type: 'string' });
  const xlsxBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  await writeFile(targetPath, xlsxBuffer);
  return { outputPath: targetPath };
}

export async function convertCsvToJson(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const csvContent = await readFile(job.sourcePath, 'utf-8');
  const workbook = XLSX.read(csvContent, { type: 'string' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(firstSheet);
  await writeFile(targetPath, JSON.stringify(json, null, 2));
  return { outputPath: targetPath };
}

export async function convertCsvToHtml(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const csvContent = await readFile(job.sourcePath, 'utf-8');
  const workbook = XLSX.read(csvContent, { type: 'string' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const html = XLSX.utils.sheet_to_html(firstSheet);
  await writeFile(targetPath, html);
  return { outputPath: targetPath };
}

// JSON to other formats
export async function convertJsonToXlsx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const jsonContent = await readFile(job.sourcePath, 'utf-8');
  const data = JSON.parse(jsonContent);
  const worksheet = XLSX.utils.json_to_sheet(Array.isArray(data) ? data : [data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const xlsxBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  await writeFile(targetPath, xlsxBuffer);
  return { outputPath: targetPath };
}

export async function convertJsonToCsv(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const jsonContent = await readFile(job.sourcePath, 'utf-8');
  const data = JSON.parse(jsonContent);
  const worksheet = XLSX.utils.json_to_sheet(Array.isArray(data) ? data : [data]);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  await writeFile(targetPath, csv);
  return { outputPath: targetPath };
}
