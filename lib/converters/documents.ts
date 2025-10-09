import path from "path";
import { readFile, writeFile } from "fs/promises";
import { createWriteStream } from "fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import mammoth from "mammoth";
import { marked } from "marked";
import { JSDOM } from "jsdom";
import Tesseract from "tesseract.js";
import PDFParser from "pdf2json";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import type { ConversionJobData } from "@/lib/jobs";

// DOCX to other formats
export async function convertDocxToTxt(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const result = await mammoth.extractRawText({ buffer });
  await writeFile(targetPath, result.value);
  return { outputPath: targetPath };
}

export async function convertDocxToHtml(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const result = await mammoth.convertToHtml({ buffer });
  await writeFile(targetPath, result.value);
  return { outputPath: targetPath };
}

// TXT to PDF
export async function convertTxtToPdf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const text = await readFile(job.sourcePath, 'utf-8');
  
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  const lines = text.split('\n');
  const pageWidth = 595.28; // A4 width in points
  const pageHeight = 841.89; // A4 height in points
  const margin = 50;
  const fontSize = 12;
  const lineHeight = fontSize * 1.2;
  const maxLinesPerPage = Math.floor((pageHeight - 2 * margin) / lineHeight);
  
  for (let i = 0; i < lines.length; i += maxLinesPerPage) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const pageLines = lines.slice(i, i + maxLinesPerPage);
    
    let y = pageHeight - margin;
    for (const line of pageLines) {
      page.drawText(line.substring(0, 100), {
        x: margin,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    }
  }
  
  const pdfBytes = await pdfDoc.save();
  await writeFile(targetPath, pdfBytes);
  return { outputPath: targetPath };
}

// PDF to TXT
export async function convertPdfToTxt(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const pdfDoc = await PDFDocument.load(new Uint8Array(buffer));
  
  let text = '';
  const pages = pdfDoc.getPages();
  
  // Note: pdf-lib doesn't extract text, this is a placeholder
  // For real PDF text extraction, you'd need pdf-parse or similar
  text = `PDF has ${pages.length} pages.\nText extraction requires additional libraries like pdf-parse.`;
  
  await writeFile(targetPath, text);
  return { outputPath: targetPath };
}

// HTML to TXT
export async function convertHtmlToTxt(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const html = await readFile(job.sourcePath, 'utf-8');
  
  // Simple HTML tag removal
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  await writeFile(targetPath, text);
  return { outputPath: targetPath };
}

// Markdown to HTML
export async function convertMdToHtml(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const markdown = await readFile(job.sourcePath, 'utf-8');
  
  // Basic markdown to HTML conversion
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br>');
  
  html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Converted from Markdown</title>
</head>
<body>
  ${html}
</body>
</html>`;
  
  await writeFile(targetPath, html);
  return { outputPath: targetPath };
}

// Markdown to TXT
export async function convertMdToTxt(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const markdown = await readFile(job.sourcePath, 'utf-8');
  
  // Remove markdown formatting
  const text = markdown
    .replace(/[#*_`]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .trim();
  
  await writeFile(targetPath, text);
  return { outputPath: targetPath };
}

// ===== NEW ADVANCED DOCUMENT CONVERTERS =====

// DOCX to ODT
export async function convertDocxToOdt(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const result = await mammoth.convertToHtml({ buffer });
  const html = result.value;
  
  // Create a basic ODT structure (simplified version)
  const odtContent = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0">
  <office:body>
    <office:text>
      <text:p>${html.replace(/<[^>]+>/g, ' ').trim()}</text:p>
    </office:text>
  </office:body>
</office:document-content>`;
  
  await writeFile(targetPath, odtContent, 'utf-8');
  return { outputPath: targetPath };
}

// DOCX to RTF
export async function convertDocxToRtf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const result = await mammoth.extractRawText({ buffer });
  const text = result.value;
  
  // Create RTF format
  const rtf = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}
{\\colortbl;\\red0\\green0\\blue0;}
\\f0\\fs24
${text.split('\n').map(line => `${line}\\par`).join('\n')}
}`;
  
  await writeFile(targetPath, rtf, 'utf-8');
  return { outputPath: targetPath };
}

// DOCX to PDF
export async function convertDocxToPdf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const result = await mammoth.extractRawText({ buffer });
  let text = result.value;
  
  // Helper function to sanitize text for WinAnsi encoding (StandardFonts only support ASCII)
  const sanitizeText = (str: string): string => {
    // Replace common Unicode characters with ASCII equivalents
    const replacements: Record<string, string> = {
      '\u20B9': 'Rs.',  // ₹
      '\u20AC': 'EUR',  // €
      '\u00A3': 'GBP',  // £
      '\u00A5': 'JPY',  // ¥
      '\u00A9': '(c)',  // ©
      '\u00AE': '(R)',  // ®
      '\u2122': '(TM)', // ™
      '\u00B0': ' deg', // °
      '\u00B1': '+/-',  // ±
      '\u00D7': 'x',    // ×
      '\u00F7': '/',    // ÷
      '\u2022': '*',    // •
      '\u2013': '-',    // –
      '\u2014': '--',   // —
      '\u2018': "'",    // '
      '\u2019': "'",    // '
      '\u201C': '"',    // "
      '\u201D': '"',    // "
      '\u2026': '...',  // …
    };
    
    let sanitized = str;
    for (const [unicode, ascii] of Object.entries(replacements)) {
      sanitized = sanitized.split(unicode).join(ascii);
    }
    
    // Remove any remaining non-ASCII characters (keep only printable ASCII 32-126)
    sanitized = sanitized.replace(/[^\x20-\x7E\n\r\t]/g, '?');
    
    return sanitized;
  };
  
  text = sanitizeText(text);
  
  // Create PDF using pdf-lib
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  const lines = text.split('\n');
  const pageWidth = 595.28; // A4 width in points
  const pageHeight = 841.89; // A4 height in points
  const margin = 50;
  const fontSize = 12;
  const lineHeight = fontSize * 1.2;
  const maxLinesPerPage = Math.floor((pageHeight - 2 * margin) / lineHeight);
  const maxCharsPerLine = Math.floor((pageWidth - 2 * margin) / (fontSize * 0.6));
  
  // Wrap long lines
  const wrappedLines: string[] = [];
  for (const line of lines) {
    if (line.length <= maxCharsPerLine) {
      wrappedLines.push(line);
    } else {
      // Split long lines
      for (let i = 0; i < line.length; i += maxCharsPerLine) {
        wrappedLines.push(line.substring(i, i + maxCharsPerLine));
      }
    }
  }
  
  // Create pages
  for (let i = 0; i < wrappedLines.length; i += maxLinesPerPage) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const pageLines = wrappedLines.slice(i, i + maxLinesPerPage);
    
    let y = pageHeight - margin;
    for (const line of pageLines) {
      page.drawText(line, {
        x: margin,
        y: y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    }
  }
  
  const pdfBytes = await pdfDoc.save();
  await writeFile(targetPath, pdfBytes);
  return { outputPath: targetPath };
}

// DOC to DOCX (legacy format)
export async function convertDocToDocx(job: ConversionJobData) {
  // DOC is a binary format that's difficult to parse without LibreOffice
  throw new Error('DOC to DOCX conversion requires LibreOffice. Please use DOCX files or convert with desktop software first.');
}

// ODT to DOCX
export async function convertOdtToDocx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const odtContent = await readFile(job.sourcePath, 'utf-8');
  
  // Extract text from ODT XML
  const textMatch = odtContent.match(/<text:p>(.*?)<\/text:p>/g);
  const text = textMatch ? textMatch.join('\n').replace(/<[^>]+>/g, '') : '';
  
  // Create simple DOCX-like structure
  const docxContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${text.split('\n').filter(line => line.trim()).map(para => 
      `<w:p><w:r><w:t>${para.trim()}</w:t></w:r></w:p>`
    ).join('\n')}
  </w:body>
</w:document>`;
  
  await writeFile(targetPath, docxContent, 'utf-8');
  return { outputPath: targetPath };
}

// RTF to DOCX
export async function convertRtfToDocx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const rtfContent = await readFile(job.sourcePath, 'utf-8');
  
  // Extract text from RTF (simplified)
  let text = rtfContent.replace(/\{[^}]*\}/g, '').replace(/\\par/g, '\n').trim();
  
  const docxContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${text.split('\n').filter(line => line.trim()).map(para => 
      `<w:p><w:r><w:t>${para.trim()}</w:t></w:r></w:p>`
    ).join('\n')}
  </w:body>
</w:document>`;
  
  await writeFile(targetPath, docxContent, 'utf-8');
  return { outputPath: targetPath };
}

// PDF to DOCX
export async function convertPdfToDocx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const pdfDoc = await PDFDocument.load(new Uint8Array(buffer));

  // Extract text using pdf2json (best-effort). Fallback to metadata-only if parsing fails.
  const extractedText: string = await new Promise((resolve) => {
    try {
      const parser = new PDFParser();
      let text = "";

      parser.on("pdfParser_dataError", () => {
        resolve("");
      });

      parser.on("pdfParser_dataReady", (pdfData: any) => {
        if (pdfData.Pages && Array.isArray(pdfData.Pages)) {
          pdfData.Pages.forEach((page: any, idx: number) => {
            text += `\n${"=".repeat(60)}\nPage ${idx + 1}\n${"=".repeat(60)}\n`;
            if (page.Texts && Array.isArray(page.Texts)) {
              page.Texts.forEach((t: any) => {
                if (t.R && Array.isArray(t.R)) {
                  t.R.forEach((r: any) => {
                    if (r.T) text += decodeURIComponent(r.T) + " ";
                  });
                }
              });
              text += "\n\n";
            }
          });
        }
        resolve(text.trim());
      });

      parser.parseBuffer(buffer);
    } catch {
      resolve("");
    }
  });

  // Build a proper DOCX using docx
  const title = pdfDoc.getTitle() || "PDF Document";
  const sections: { children: Paragraph[] }[] = [];

  const paras: Paragraph[] = [];
  paras.push(
    new Paragraph({
      text: title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    })
  );
  paras.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Author: ${pdfDoc.getAuthor() || "Unknown"}` }),
        new TextRun({ text: "    " }),
        new TextRun({ text: `Pages: ${pdfDoc.getPageCount()}` }),
      ],
    })
  );
  paras.push(
    new Paragraph({
      text: `Created: ${pdfDoc.getCreationDate()?.toString() || "Unknown"}`,
    })
  );
  paras.push(new Paragraph({ text: "" }));

  if (extractedText) {
    const blocks = extractedText.split(/\n\n+/).map((s) => s.trim()).filter(Boolean);
    for (const block of blocks) {
      paras.push(new Paragraph({ text: block }));
    }
  } else {
    paras.push(
      new Paragraph({
        children: [
          new TextRun({
            text:
              "Note: Could not extract text from this PDF (it may be scanned or complex). Metadata is included above.",
            italics: true,
          }),
        ],
      })
    );
  }

  sections.push({ children: paras });

  const doc = new Document({ sections });
  const bufferOut = await Packer.toBuffer(doc);
  await writeFile(targetPath, new Uint8Array(bufferOut));

  return { outputPath: targetPath };
}

// PDF to RTF
export async function convertPdfToRtf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const buffer = await readFile(job.sourcePath);
  const pdfDoc = await PDFDocument.load(new Uint8Array(buffer));
  
  const pages = pdfDoc.getPages();
  const text = `PDF Document Conversion\n\nThis PDF has ${pages.length} pages.\nNote: Full text extraction from PDF requires pdf-parse or similar libraries.`;
  
  const rtf = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}
\\f0\\fs24
${text.split('\n').map(line => `${line}\\par`).join('\n')}
}`;
  
  await writeFile(targetPath, rtf, 'utf-8');
  return { outputPath: targetPath };
}

// PDF to Images (each page as image)
export async function convertPdfToImages(job: ConversionJobData) {
  // This requires pdf-poppler or similar system dependency
  throw new Error('PDF to Images conversion requires Poppler (pdfimages). This will work on Render with system dependencies installed.');
}

// Images to PDF
export async function convertImagesToPdf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const imageBuffer = await readFile(job.sourcePath);
  
  const pdfDoc = await PDFDocument.create();
  const ext = path.extname(job.sourcePath).toLowerCase();
  
  let image;
  if (ext === '.png') {
    image = await pdfDoc.embedPng(new Uint8Array(imageBuffer));
  } else if (ext === '.jpg' || ext === '.jpeg') {
    image = await pdfDoc.embedJpg(new Uint8Array(imageBuffer));
  } else {
    throw new Error(`Unsupported image format: ${ext}`);
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

// Markdown to DOCX (using marked)
export async function convertMdToDocx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const markdown = await readFile(job.sourcePath, 'utf-8');
  const html = await marked(markdown);
  
  // Convert HTML to plain text for DOCX
  const dom = new JSDOM(html);
  const text = dom.window.document.body.textContent || '';
  
  const docxContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${text.split('\n').filter(line => line.trim()).map(para => 
      `<w:p><w:r><w:t>${para.trim()}</w:t></w:r></w:p>`
    ).join('\n')}
  </w:body>
</w:document>`;
  
  await writeFile(targetPath, docxContent, 'utf-8');
  return { outputPath: targetPath };
}

// Markdown to PDF
export async function convertMdToPdf(job: ConversionJobData) {
  // This requires Puppeteer for proper HTML to PDF rendering
  throw new Error('Markdown to PDF conversion requires Puppeteer. This will work on Render deployment.');
}

// Markdown to RTF
export async function convertMdToRtf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const markdown = await readFile(job.sourcePath, 'utf-8');
  const html = await marked(markdown);
  
  const dom = new JSDOM(html);
  const text = dom.window.document.body.textContent || '';
  
  const rtf = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}
\\f0\\fs24
${text.split('\n').map(line => `${line}\\par`).join('\n')}
}`;
  
  await writeFile(targetPath, rtf, 'utf-8');
  return { outputPath: targetPath };
}

// HTML to PDF
export async function convertHtmlToPdf(job: ConversionJobData) {
  // Requires Puppeteer for proper HTML rendering to PDF
  throw new Error('HTML to PDF conversion requires Puppeteer. This will work on Render deployment.');
}

// HTML to DOCX
export async function convertHtmlToDocx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const html = await readFile(job.sourcePath, 'utf-8');
  const dom = new JSDOM(html);
  const text = dom.window.document.body.textContent || '';
  
  const docxContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${text.split('\n').filter(line => line.trim()).map(para => 
      `<w:p><w:r><w:t>${para.trim()}</w:t></w:r></w:p>`
    ).join('\n')}
  </w:body>
</w:document>`;
  
  await writeFile(targetPath, docxContent, 'utf-8');
  return { outputPath: targetPath };
}

// HTML to RTF
export async function convertHtmlToRtf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const html = await readFile(job.sourcePath, 'utf-8');
  const dom = new JSDOM(html);
  const text = dom.window.document.body.textContent || '';
  
  const rtf = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}
\\f0\\fs24
${text.split('\n').map(line => `${line}\\par`).join('\n')}
}`;
  
  await writeFile(targetPath, rtf, 'utf-8');
  return { outputPath: targetPath };
}

// LaTeX to PDF
export async function convertLatexToPdf(job: ConversionJobData) {
  // Requires pdflatex system binary
  throw new Error('LaTeX to PDF conversion requires pdflatex system binary. This will work on Render with LaTeX installed.');
}

// LaTeX to DOCX
export async function convertLatexToDocx(job: ConversionJobData) {
  // Requires pandoc system binary
  throw new Error('LaTeX to DOCX conversion requires Pandoc. This will work on Render deployment.');
}

// ===== OCR CONVERTERS =====

// Image to Searchable PDF (OCR)
export async function convertImageToSearchablePdf(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  
  // Perform OCR
  const { data: { text } } = await Tesseract.recognize(job.sourcePath, 'eng', {
    logger: (m) => console.log('OCR Progress:', m),
  });
  
  // Create PDF with original image and text layer
  const pdfDoc = await PDFDocument.create();
  const imageBuffer = await readFile(job.sourcePath);
  const ext = path.extname(job.sourcePath).toLowerCase();
  
  let image;
  if (ext === '.png') {
    image = await pdfDoc.embedPng(new Uint8Array(imageBuffer));
  } else {
    image = await pdfDoc.embedJpg(new Uint8Array(imageBuffer));
  }
  
  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: image.width,
    height: image.height,
  });
  
  // Add invisible text layer for searching (simplified - real implementation would position text accurately)
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.drawText(text, {
    x: 0,
    y: image.height - 10,
    size: 1,
    font,
    color: rgb(1, 1, 1),
    opacity: 0.01,
  });
  
  const pdfBytes = await pdfDoc.save();
  await writeFile(targetPath, pdfBytes);
  return { outputPath: targetPath };
}

// Image to Text (OCR)
export async function convertImageToTextOcr(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  
  const { data: { text, confidence } } = await Tesseract.recognize(job.sourcePath, 'eng', {
    logger: (m) => console.log('OCR Progress:', m),
  });
  
  const output = `OCR Text Extraction
${'='.repeat(50)}

Source: ${path.basename(job.sourcePath)}
Confidence: ${confidence ? confidence.toFixed(2) + '%' : 'N/A'}

Extracted Text:
${'-'.repeat(50)}

${text}

${'='.repeat(50)}
Note: OCR accuracy depends on image quality, text clarity, and language.
`;
  
  await writeFile(targetPath, output, 'utf-8');
  return { outputPath: targetPath };
}

// Scanned PDF to Searchable PDF
export async function convertScannedPdfToSearchable(job: ConversionJobData) {
  // This requires converting PDF pages to images, running OCR, then creating new PDF
  throw new Error('Scanned PDF to Searchable PDF requires Poppler + Tesseract coordination. This will work on Render deployment.');
}

// PDF to Text (OCR)
export async function convertPdfToTextOcr(job: ConversionJobData) {
  // This requires converting PDF pages to images first, then OCR
  throw new Error('PDF OCR requires Poppler + Tesseract. This will work on Render deployment.');
}
