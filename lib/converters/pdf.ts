import path from "path";
import { readFile, writeFile } from "fs/promises";
import { PDFDocument, rgb, StandardFonts, PageSizes } from "pdf-lib";
import { jsPDF } from "jspdf";
import PDFParser from "pdf2json";
import type { ConversionJobData } from "@/lib/jobs";

// PDF to Text - Full text extraction using pdf2json
export async function convertPdfToText(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  
  return new Promise<{ outputPath: string }>(async (resolve, reject) => {
    try {
      const buffer = await readFile(job.sourcePath);
      const pdfDoc = await PDFDocument.load(new Uint8Array(buffer));
      
      const pdfParser = new PDFParser();
      
      pdfParser.on("pdfParser_dataError", async (errData: any) => {
        // Fallback to metadata only if parsing fails
        const pageCount = pdfDoc.getPageCount();
        let text = `PDF Document Information\n${'='.repeat(70)}\n\n`;
        
        text += `File: ${path.basename(job.sourcePath)}\n`;
        text += `Total Pages: ${pageCount}\n`;
        text += `Title: ${pdfDoc.getTitle() || 'Untitled'}\n`;
        text += `Author: ${pdfDoc.getAuthor() || 'Unknown'}\n`;
        text += `Subject: ${pdfDoc.getSubject() || 'N/A'}\n`;
        text += `Keywords: ${pdfDoc.getKeywords() || 'N/A'}\n`;
        text += `Creator: ${pdfDoc.getCreator() || 'Unknown'}\n`;
        text += `Producer: ${pdfDoc.getProducer() || 'Unknown'}\n`;
        text += `Created: ${pdfDoc.getCreationDate()?.toString() || 'Unknown'}\n`;
        text += `Modified: ${pdfDoc.getModificationDate()?.toString() || 'Unknown'}\n\n`;
        text += `${'='.repeat(70)}\n\n`;
        text += `Note: This PDF contains complex formatting or images that couldn't be\n`;
        text += `extracted as plain text. Metadata information is shown above.\n`;
        
        await writeFile(targetPath, text);
        resolve({ outputPath: targetPath });
      });
      
      pdfParser.on("pdfParser_dataReady", async (pdfData: any) => {
        try {
          // Extract text from all pages
          let extractedText = '';
          
          if (pdfData.Pages && Array.isArray(pdfData.Pages)) {
            pdfData.Pages.forEach((page: any, pageIndex: number) => {
              extractedText += `\n${'='.repeat(70)}\n`;
              extractedText += `Page ${pageIndex + 1}\n`;
              extractedText += `${'='.repeat(70)}\n\n`;
              
              if (page.Texts && Array.isArray(page.Texts)) {
                page.Texts.forEach((textItem: any) => {
                  if (textItem.R && Array.isArray(textItem.R)) {
                    textItem.R.forEach((textRun: any) => {
                      if (textRun.T) {
                        extractedText += decodeURIComponent(textRun.T) + ' ';
                      }
                    });
                  }
                });
                extractedText += '\n\n';
              }
            });
          }
          
          // Add metadata header
          let text = `PDF Document\n${'='.repeat(70)}\n\n`;
          text += `File: ${path.basename(job.sourcePath)}\n`;
          text += `Title: ${pdfDoc.getTitle() || 'Untitled'}\n`;
          text += `Author: ${pdfDoc.getAuthor() || 'Unknown'}\n`;
          text += `Total Pages: ${pdfDoc.getPageCount()}\n`;
          text += `Created: ${pdfDoc.getCreationDate()?.toString() || 'Unknown'}\n\n`;
          
          // Add extracted text
          if (extractedText.trim()) {
            text += `\nEXTRACTED CONTENT:\n`;
            text += extractedText;
          } else {
            text += `\nNote: No text content could be extracted from this PDF.\n`;
            text += `The document may contain only images or use unsupported encoding.\n`;
          }
          
          await writeFile(targetPath, text);
          resolve({ outputPath: targetPath });
        } catch (error) {
          reject(error);
        }
      });
      
      // Parse the PDF
      pdfParser.parseBuffer(buffer);
      
    } catch (error) {
      reject(error);
    }
  });
}

// PDF to JSON (metadata)
export async function convertPdfToJson(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const pdfDoc = await PDFDocument.load(new Uint8Array(buffer));
  
  const jsonData = {
    title: pdfDoc.getTitle() || 'Untitled',
    author: pdfDoc.getAuthor() || 'Unknown',
    subject: pdfDoc.getSubject() || '',
    creator: pdfDoc.getCreator() || '',
    producer: pdfDoc.getProducer() || '',
    creationDate: pdfDoc.getCreationDate()?.toString() || '',
    modificationDate: pdfDoc.getModificationDate()?.toString() || '',
    pageCount: pdfDoc.getPageCount(),
    keywords: pdfDoc.getKeywords() || ''
  };
  
  await writeFile(targetPath, JSON.stringify(jsonData, null, 2));
  return { outputPath: targetPath };
}

// Merge multiple pages (placeholder - would need multiple files)
export async function optimizePdf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const pdfDoc = await PDFDocument.load(new Uint8Array(buffer));
  
  // Optimize by saving with minimal options
  const optimizedPdfBytes = await pdfDoc.save({
    useObjectStreams: false,
    addDefaultPage: false
  });
  
  await writeFile(targetPath, optimizedPdfBytes);
  return { outputPath: targetPath };
}

// HTML to PDF
export async function convertHtmlToPdf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const htmlContent = await readFile(job.sourcePath, 'utf-8');
  
  // Using jsPDF for basic HTML to PDF
  const doc = new jsPDF();
  
  // Strip HTML tags and convert to text
  const text = htmlContent
    .replace(/<[^>]+>/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Split text into lines for PDF
  const lines = doc.splitTextToSize(text, 180);
  doc.text(lines, 10, 10);
  
  const pdfBytes = doc.output('arraybuffer');
  await writeFile(targetPath, new Uint8Array(pdfBytes));
  return { outputPath: targetPath };
}

// Images to PDF (single image)
export async function convertImageToPdf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const imageBytes = await readFile(job.sourcePath);
  
  const pdfDoc = await PDFDocument.create();
  
  // Detect image type and embed
  const ext = path.extname(job.sourcePath).toLowerCase();
  let image;
  
  if (ext === '.jpg' || ext === '.jpeg') {
    image = await pdfDoc.embedJpg(new Uint8Array(imageBytes));
  } else if (ext === '.png') {
    image = await pdfDoc.embedPng(new Uint8Array(imageBytes));
  } else {
    throw new Error('Unsupported image format. Use JPG or PNG.');
  }
  
  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: image.width,
    height: image.height,
  });
  
  const pdfBytes = await pdfDoc.save();
  await writeFile(targetPath, pdfBytes);
  return { outputPath: targetPath };
}

// PDF page count info
export async function getPdfInfo(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const pdfDoc = await PDFDocument.load(new Uint8Array(buffer));
  
  const info = `PDF Information
================

File: ${path.basename(job.sourcePath)}
Title: ${pdfDoc.getTitle() || 'Untitled'}
Author: ${pdfDoc.getAuthor() || 'Unknown'}
Pages: ${pdfDoc.getPageCount()}
Creator: ${pdfDoc.getCreator() || 'Unknown'}
Producer: ${pdfDoc.getProducer() || 'Unknown'}
Created: ${pdfDoc.getCreationDate()?.toString() || 'Unknown'}
Modified: ${pdfDoc.getModificationDate()?.toString() || 'Unknown'}
`;
  
  await writeFile(targetPath, info);
  return { outputPath: targetPath };
}

// PDF to HTML with text extraction
export async function convertPdfToHtml(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  
  return new Promise<{ outputPath: string }>(async (resolve, reject) => {
    try {
      const buffer = await readFile(job.sourcePath);
      const pdfDoc = await PDFDocument.load(new Uint8Array(buffer));
      const pdfParser = new PDFParser();
      
      pdfParser.on("pdfParser_dataError", async (errData: any) => {
        // Fallback to metadata only
        const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${pdfDoc.getTitle() || 'PDF Document'}</title>
  <style>
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      max-width: 900px; 
      margin: 0 auto; 
      padding: 30px; 
      line-height: 1.6;
      background: #f5f5f5;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
    }
    .meta { 
      background: white; 
      padding: 25px; 
      margin-bottom: 20px; 
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    }
    .info-row {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      width: 150px;
      color: #555;
    }
    .info-value {
      flex: 1;
      color: #333;
    }
    .note {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px 20px;
      margin-top: 20px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${pdfDoc.getTitle() || 'PDF Document'}</h1>
    <p style="margin: 0; opacity: 0.9;">Extracted Information</p>
  </div>
  <div class="meta">
    <h2 style="margin-top: 0; color: #667eea;">Document Metadata</h2>
    <div class="info-row">
      <span class="info-label">File:</span>
      <span class="info-value">${path.basename(job.sourcePath)}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Author:</span>
      <span class="info-value">${pdfDoc.getAuthor() || 'Unknown'}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Pages:</span>
      <span class="info-value">${pdfDoc.getPageCount()}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Subject:</span>
      <span class="info-value">${pdfDoc.getSubject() || 'N/A'}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Keywords:</span>
      <span class="info-value">${pdfDoc.getKeywords() || 'N/A'}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Creator:</span>
      <span class="info-value">${pdfDoc.getCreator() || 'Unknown'}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Producer:</span>
      <span class="info-value">${pdfDoc.getProducer() || 'Unknown'}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Created:</span>
      <span class="info-value">${pdfDoc.getCreationDate()?.toString() || 'Unknown'}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Modified:</span>
      <span class="info-value">${pdfDoc.getModificationDate()?.toString() || 'Unknown'}</span>
    </div>
  </div>
  <div class="note">
    <strong>⚠️ Note:</strong> Text extraction failed for this PDF. It may contain complex formatting or embedded images.
  </div>
</body>
</html>`;
        
        await writeFile(targetPath, html);
        resolve({ outputPath: targetPath });
      });
      
      pdfParser.on("pdfParser_dataReady", async (pdfData: any) => {
        try {
          // Extract text from all pages
          let contentHtml = '';
          
          if (pdfData.Pages && Array.isArray(pdfData.Pages)) {
            pdfData.Pages.forEach((page: any, pageIndex: number) => {
              contentHtml += `<div class="page">`;
              contentHtml += `<h3>Page ${pageIndex + 1}</h3>`;
              contentHtml += `<div class="page-content">`;
              
              if (page.Texts && Array.isArray(page.Texts)) {
                let pageText = '';
                page.Texts.forEach((textItem: any) => {
                  if (textItem.R && Array.isArray(textItem.R)) {
                    textItem.R.forEach((textRun: any) => {
                      if (textRun.T) {
                        pageText += decodeURIComponent(textRun.T) + ' ';
                      }
                    });
                  }
                });
                
                // Split into paragraphs
                const paragraphs = pageText.split(/\n\n+/).filter(p => p.trim());
                paragraphs.forEach(para => {
                  contentHtml += `<p>${para.trim()}</p>`;
                });
              }
              
              contentHtml += `</div></div>`;
            });
          }
          
          const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${pdfDoc.getTitle() || 'PDF Document'}</title>
  <style>
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      max-width: 900px; 
      margin: 0 auto; 
      padding: 30px; 
      line-height: 1.8;
      background: #f5f5f5;
      color: #333;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
    }
    .meta { 
      background: white; 
      padding: 20px; 
      margin-bottom: 25px; 
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
      font-size: 14px;
      color: #666;
    }
    .content {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    }
    .page {
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 2px solid #eee;
    }
    .page:last-child {
      border-bottom: none;
    }
    .page h3 {
      color: #667eea;
      margin: 0 0 20px 0;
      font-size: 20px;
    }
    .page-content p {
      margin: 0 0 15px 0;
      text-align: justify;
    }
    .success {
      background: #d4edda;
      border-left: 4px solid #28a745;
      padding: 15px 20px;
      margin-bottom: 20px;
      border-radius: 4px;
      color: #155724;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${pdfDoc.getTitle() || 'PDF Document'}</h1>
    <p style="margin: 0; opacity: 0.9;">Converted to HTML with Full Text Extraction</p>
  </div>
  <div class="meta">
    <strong>Author:</strong> ${pdfDoc.getAuthor() || 'Unknown'} | 
    <strong>Pages:</strong> ${pdfDoc.getPageCount()} | 
    <strong>Created:</strong> ${pdfDoc.getCreationDate()?.toLocaleDateString() || 'Unknown'}
  </div>
  ${contentHtml ? `<div class="success"><strong>✓ Success:</strong> Text content extracted successfully from ${pdfDoc.getPageCount()} page(s).</div>` : ''}
  <div class="content">
    ${contentHtml || '<p>No text content could be extracted from this PDF.</p>'}
  </div>
</body>
</html>`;
          
          await writeFile(targetPath, html);
          resolve({ outputPath: targetPath });
        } catch (error) {
          reject(error);
        }
      });
      
      pdfParser.parseBuffer(buffer);
      
    } catch (error) {
      reject(error);
    }
  });
}

// Split PDF to text pages
export async function splitPdfPages(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const pdfDoc = await PDFDocument.load(new Uint8Array(buffer));
  
  const pageCount = pdfDoc.getPageCount();
  let output = `PDF Page Split\n===============\n\nTotal Pages: ${pageCount}\n\n`;
  
  for (let i = 0; i < pageCount; i++) {
    output += `--- Page ${i + 1} ---\n\n`;
  }
  
  await writeFile(targetPath, output);
  return { outputPath: targetPath };
}
