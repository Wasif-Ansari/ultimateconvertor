import path from "path";
import { writeFile, readFile } from "fs/promises";
import PptxGenJS from "pptxgenjs";
import type { ConversionJobData } from "@/lib/jobs";

// Text to PPTX (create slides from text)
export async function convertTxtToPptx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const text = await readFile(job.sourcePath, 'utf-8');
  
  const pptx = new PptxGenJS();
  
  // Split text into slides (by double line breaks or every 500 chars)
  const slides = text.split('\n\n').filter(s => s.trim());
  
  for (const slideText of slides) {
    const slide = pptx.addSlide();
    slide.addText(slideText.substring(0, 500), {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 5,
      fontSize: 18,
      color: '363636',
      wrap: true
    });
  }
  
  // If no double line breaks, create one slide
  if (slides.length === 0) {
    const slide = pptx.addSlide();
    slide.addText(text.substring(0, 1000), {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 5,
      fontSize: 18,
      color: '363636',
      wrap: true
    });
  }
  
  await pptx.writeFile({ fileName: targetPath });
  return { outputPath: targetPath };
}

// JSON to PPTX (data-driven slides)
export async function convertJsonToPptx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const jsonContent = await readFile(job.sourcePath, 'utf-8');
  const data = JSON.parse(jsonContent);
  
  const pptx = new PptxGenJS();
  
  // If array, create slide for each item
  const items = Array.isArray(data) ? data : [data];
  
  for (const item of items) {
    const slide = pptx.addSlide();
    
    // Add title if available
    const title = item.title || item.name || 'Data Slide';
    slide.addText(title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1,
      fontSize: 32,
      bold: true,
      color: '363636'
    });
    
    // Add content
    const content = JSON.stringify(item, null, 2);
    slide.addText(content.substring(0, 800), {
      x: 0.5,
      y: 2,
      w: 9,
      h: 4,
      fontSize: 14,
      fontFace: 'Courier New',
      color: '666666'
    });
  }
  
  await pptx.writeFile({ fileName: targetPath });
  return { outputPath: targetPath };
}

// CSV to PPTX (table slides)
export async function convertCsvToPptx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const csvContent = await readFile(job.sourcePath, 'utf-8');
  
  const pptx = new PptxGenJS();
  const slide = pptx.addSlide();
  
  // Parse CSV
  const rows = csvContent.split('\n').map(row => row.split(','));
  
  // Add title
  slide.addText('CSV Data', {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.5,
    fontSize: 28,
    bold: true,
    color: '363636'
  });
  
  // Add table (first 10 rows)
  const tableData = rows.slice(0, 10).map(row => 
    row.map(cell => ({ text: cell.trim(), options: { fontSize: 10 } }))
  );
  
  slide.addTable(tableData, {
    x: 0.5,
    y: 1,
    w: 9,
    h: 4,
    border: { type: 'solid', color: 'CCCCCC', pt: 1 }
  });
  
  await pptx.writeFile({ fileName: targetPath });
  return { outputPath: targetPath };
}

// Markdown to PPTX
export async function convertMdToPptx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  const markdown = await readFile(job.sourcePath, 'utf-8');
  
  const pptx = new PptxGenJS();
  
  // Split by headers (# or ##)
  const slides = markdown.split(/^#{1,2} /gm).filter(s => s.trim());
  
  for (const slideContent of slides) {
    const slide = pptx.addSlide();
    const lines = slideContent.split('\n');
    const title = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();
    
    // Add title
    slide.addText(title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 1,
      fontSize: 32,
      bold: true,
      color: '363636'
    });
    
    // Add content (remove markdown syntax)
    const cleanContent = content
      .replace(/[*_`]/g, '')
      .substring(0, 600);
    
    slide.addText(cleanContent, {
      x: 0.5,
      y: 2,
      w: 9,
      h: 4,
      fontSize: 18,
      color: '666666',
      wrap: true
    });
  }
  
  await pptx.writeFile({ fileName: targetPath });
  return { outputPath: targetPath };
}

// Create blank PPTX template
export async function createBlankPptx(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  
  const pptx = new PptxGenJS();
  
  // Title slide
  const slide1 = pptx.addSlide();
  slide1.addText('Presentation Title', {
    x: 1,
    y: 2.5,
    w: 8,
    h: 1,
    fontSize: 44,
    bold: true,
    color: '363636',
    align: 'center'
  });
  
  // Content slide
  const slide2 = pptx.addSlide();
  slide2.addText('Slide Title', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.75,
    fontSize: 32,
    bold: true,
    color: '363636'
  });
  slide2.addText('• Bullet point 1\n• Bullet point 2\n• Bullet point 3', {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 3,
    fontSize: 18,
    color: '666666'
  });
  
  await pptx.writeFile({ fileName: targetPath });
  return { outputPath: targetPath };
}
