# Ultimate File Converter 🚀

**Developed by [W Software Solutions](https://github.com/Wasif-Ansari)**

![W Software Solutions](public/W-logo.jpg)

A comprehensive, professional-grade file conversion web application supporting **120+ conversion tools** across multiple categories including images, documents, videos, audio, spreadsheets, presentations, archives, and OCR.

---

## 🏢 About W Software Solutions

**W Software Solutions** is a leading software development company specializing in innovative web applications and digital transformation solutions. Our mission is to simplify complex technical tasks and make them accessible to everyone through cutting-edge technology and user-friendly interfaces.

### Our Products
- **Ultimate File Converter** - Professional file conversion service with 120+ tools
- More innovative solutions coming soon...

---

## ✨ Features

- 🖼️ **17 Image conversions**: JPG, PNG, WEBP, TIFF, AVIF - all formats supported
- 📄 **7 Document conversions**: DOCX, PDF, TXT, HTML, Markdown
- 📊 **9 Spreadsheet conversions**: XLSX, CSV, JSON, HTML
- 🎨 **8 PDF operations**: Extract, convert, optimize, split PDFs
- 📽️ **4 Presentation tools**: Create PPTX from TXT, JSON, CSV, Markdown
- 🎬 **2 Media tools**: Extract metadata from video/audio files
- 📦 **2 Archive operations**: ZIP creation and listing
- 🚀 **Instant processing**: Synchronous conversions with no queue delays
- � **Drag-and-drop uploads**: Live progress and secure downloads
- 🎨 **Beautiful UI**: Tailwind CSS with smooth animations
- ⚡ **Zero configuration**: Just `npm install` and start converting!
- 📦 **Pure JavaScript**: No ImageMagick, FFmpeg, or other CLI tools needed

## 🛠️ Tech Stack

- **Next.js 14** - App Router with TypeScript
- **Sharp** - High-performance image processing
- **pdf-lib & jsPDF** - PDF generation and manipulation
- **pptxgenjs** - PowerPoint presentation generation
- **xlsx** - Excel/CSV/JSON spreadsheet conversions
- **mammoth** - DOCX to HTML/TXT extraction
- **archiver & adm-zip** - Archive operations
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations



## 🚀 Quick Start



```powershell- **Next.js 14** - App Router with Server Actions- 📂 Drag-and-drop uploads with live progress and secure downloadsUltimate File Converter is a Next.js 14 SaaS starter that queues heavy-duty file conversions across images, video, audio, documents, archives, and more. It pairs a polished Tailwind UI with a BullMQ job pipeline, local storage, and a headless worker so you can ship production-grade converters quickly.

# Install dependencies

npm install- **Sharp** - High-performance Node.js image processing



# Start development server- **Tailwind CSS** - Utility-first CSS framework- ⚡ Instant synchronous conversions (no queue or Redis required)

npm run dev

```- **TypeScript** - Type-safe development



Open [http://localhost:3000](http://localhost:3000) and start converting!- **Framer Motion** - Smooth animations- ⚙️ **11 working converters** across images, video, audio, documents, spreadsheets, presentations, PDF, eBooks, archives, and OCR## Features



## 📋 All Available Converters (40+ tools)



### 🖼️ Images (18 converters)## 🚀 Getting Started- 🛠️ Modular converter registry using ImageMagick, FFmpeg, LibreOffice, Poppler, Calibre, 7zip, Tesseract



| From | To | Description |

|------|-----|-------------|

| JPG | PNG, WEBP, TIFF, AVIF | Convert JPEG to various formats |```powershell- ☁️ Ready to swap local storage for S3-compatible providers- 🗂️ Category-driven dashboard spanning 10 media types

| PNG | JPG, WEBP, TIFF, AVIF | Convert PNG to various formats |

| WEBP | PNG, JPG, TIFF | Convert WEBP to various formats |# Install dependencies

| TIFF | PNG, JPG, WEBP | Convert TIFF to various formats |

| AVIF | PNG, JPG, WEBP | Convert next-gen AVIF format |npm install- 📂 Drag-and-drop uploads with live progress and secure downloads



**Supported formats**: JPG, PNG, WEBP, TIFF, AVIF



### 📄 Documents (7 converters)# Start development server## Project structure- 🧵 BullMQ queue backed by Redis, with worker concurrency controls



| From | To | Description |npm run dev

|------|-----|-------------|

| DOCX | TXT, HTML | Extract text or HTML from Word documents |```- ⚙️ Modular converter registry with a working DOCX → PDF implementation (LibreOffice)

| TXT | PDF | Generate PDF from plain text |

| PDF | TXT | Extract text from PDF files |

| HTML | TXT | Strip HTML tags and extract text |

| Markdown | HTML, TXT | Convert Markdown to HTML or plain text |Open [http://localhost:3000](http://localhost:3000) and start converting images!```- �️ Documented setup for ImageMagick, FFmpeg, LibreOffice, Pandoc, Poppler, Calibre, 7zip, unar, Tesseract



**Supported formats**: DOCX, PDF, TXT, HTML, MD



### 📊 Spreadsheets (9 converters)## 📋 Available Convertersapp/              # App Router pages and API routes- ☁️ Ready to swap local storage for S3-compatible providers



| From | To | Description |

|------|-----|-------------|

| XLSX | CSV, TXT, HTML, JSON | Convert Excel to multiple formats || From | To | Description |components/       # Reusable UI components (header, cards, upload widget)

| CSV | XLSX, JSON, HTML | Convert CSV to Excel, JSON, or HTML |

| JSON | XLSX, CSV | Convert JSON data to spreadsheet formats ||------|-----|-------------|



**Supported formats**: XLSX, CSV, JSON, HTML| JPG | PNG | Convert JPEG to lossless PNG format |lib/              # Domain logic: categories, tools, storage, converters## Project structure



### 📦 Archives (2 converters)| PNG | JPG | Convert PNG to compressed JPEG format |



| From | To | Description || PNG | WEBP | Convert PNG to modern WEBP format |uploads/          # Local storage target for uploaded/converted files

|------|-----|-------------|

| Any File | ZIP | Create a ZIP archive from any file || WEBP | PNG | Convert WEBP back to PNG format |

| ZIP | TXT | List ZIP contents as text |

``````

## 📁 Project Structure

## 📁 Project Structure

```

app/app/              # App Router pages and API routes

  ├── page.tsx              # Home page with categories

  ├── category/[slug]/      # Category pages (images, documents, etc.)```

  ├── tool/[slug]/          # Individual tool pages (40+ tools)

  └── api/jobs/             # Conversion API endpointsapp/## Prerequisitescomponents/       # Reusable UI components (header, cards, upload widget)

components/

  ├── tool-upload.tsx       # Drag-and-drop file upload  ├── page.tsx              # Home page with category cards

  ├── progress-bar.tsx      # Progress indicator

  ├── category-card.tsx     # Category cards  ├── category/[slug]/      # Category listing pageslib/              # Domain logic: categories, tools, queue bindings, storage, converters

  └── site-header.tsx       # Navigation header

lib/  ├── tool/[slug]/          # Individual tool pages with upload UI

  ├── converters/

  │   ├── images.ts         # Sharp-based image converters (18)  └── api/jobs/             # Conversion API endpoints- **Node.js 20+**worker/           # BullMQ worker entry point

  │   ├── documents.ts      # Document converters (7)

  │   ├── spreadsheets.ts   # Spreadsheet converters (9)components/

  │   ├── archive.ts        # Archive operations (2)

  │   └── index.ts          # Converter registry  ├── tool-upload.tsx       # Drag-and-drop upload component- **Conversion toolchain** (install via your OS package manager):uploads/          # Local storage target for uploaded/converted files

  ├── tools.ts              # All 40+ tool definitions

  ├── categories.ts         # 10 category definitions  ├── progress-bar.tsx      # Progress indicator

  └── storage.ts            # File system operations

uploads/                    # Local file storage  └── category-card.tsx     # Category display cards  - **ImageMagick** (`magick`) — Images: JPG ↔ PNG ↔ WEBP ↔ TIFF conversions```

```

lib/

## 🎯 How It Works

  ├── converters/  - **FFmpeg** (`ffmpeg`) — Video: MP4 ↔ WEBM, Audio: WAV ↔ MP3 ↔ FLAC

1. **Select a tool** from 40+ available converters

2. **Upload your file** via drag-and-drop or file browser  │   ├── index.ts          # Converter registry

3. **Instant conversion** happens server-side using Node.js libraries

4. **Download** your converted file immediately  │   └── images.ts         # Sharp-based image converters  - **LibreOffice** (`soffice`) — Documents: DOCX ↔ PDF, Spreadsheets: XLSX ↔ CSV, Presentations: PPTX ↔ PDF## Prerequisites



All conversions run synchronously - no queues, no waiting!  ├── tools.ts              # Tool definitions



## 🧪 Testing  ├── categories.ts         # Category definitions  - **Poppler** (`pdftotext`) — PDF text extraction



```powershell  └── storage.ts            # File system operations

npm run test

```uploads/                    # Local file storage  - **Calibre** (`ebook-convert`) — eBooks: EPUB ↔ MOBI ↔ AZW3- **Node.js 20+**



## 🔧 Environment Variables```



Optional `.env.local`:  - **7zip** (`7z`) — Archives: ZIP ↔ 7Z ↔ RAR- **Redis 6+** (local install or managed service)



```bash## 🎯 How It Works

UPLOADS_DIR=./uploads

NEXT_PUBLIC_BASE_URL=http://localhost:3000  - **Tesseract** (`tesseract`) — OCR: Image → Text- **Conversion toolchain** (install via your OS package manager):

```

1. **Upload**: Drag and drop a file or click to browse

## 📦 Key npm Packages

2. **Convert**: File is processed instantly using Sharp  - **ImageMagick** (`magick`) — Images: JPG ↔ PNG ↔ WEBP ↔ TIFF conversions

- `sharp` ^0.33.0 - Image processing (replaces ImageMagick)

- `pdf-lib` ^1.17.1 - PDF generation3. **Download**: Get your converted file immediately

- `xlsx` ^0.18.5 - Spreadsheet conversions

- `mammoth` ^1.6.0 - DOCX text extractionSee `INSTALL_WINDOWS.md` for Windows installation instructions using Chocolatey or Scoop.  - **FFmpeg** (`ffmpeg`) — Video: MP4 ↔ WEBM, Audio: WAV ↔ MP3 ↔ FLAC

- `archiver` ^6.0.1 - ZIP creation

- `adm-zip` ^0.5.10 - ZIP extractionAll conversions happen server-side in Node.js - no external tools required!

- `next` 14.2.5 - React framework

- `tailwindcss` ^3.4.4 - Styling  - **LibreOffice** (`soffice`) — Documents: DOCX ↔ PDF, Spreadsheets: XLSX ↔ CSV, Presentations: PPTX ↔ PDF



## 🎨 Categories## 🧪 Testing



1. **Images** - JPG, PNG, WEBP, TIFF, AVIF conversions## Getting started  - **Poppler** (`pdftotext`) — PDF text extraction

2. **Videos** - (Coming soon - requires FFmpeg)

3. **Audio** - (Coming soon - requires FFmpeg)```powershell

4. **Documents** - DOCX, PDF, TXT, HTML, Markdown

5. **Spreadsheets** - XLSX, CSV, JSON conversionsnpm run test  - **Calibre** (`ebook-convert`) — eBooks: EPUB ↔ MOBI ↔ AZW3

6. **Presentations** - (Coming soon - requires LibreOffice)

7. **PDF** - PDF to TXT conversion```

8. **eBooks** - (Coming soon - requires Calibre)

9. **Archives** - ZIP operations```powershell  - **7zip** (`7z`) — Archives: ZIP ↔ 7Z ↔ RAR

10. **OCR** - (Coming soon - requires Tesseract)

## 🔧 Environment Variables

## 🚀 Adding New Converters

npm install  - **Tesseract** (`tesseract`) — OCR: Image → Text

### 1. Create converter function

Create a `.env.local` file (optional):

```typescript

// lib/converters/your-category.tsnpm run dev

export async function convertSourceToTarget(job: ConversionJobData) {

  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);```bash

  // Your conversion logic here

  return { outputPath: targetPath };UPLOADS_DIR=./uploads```## Getting started

}

```NEXT_PUBLIC_BASE_URL=http://localhost:3000



### 2. Register in index.ts```



```typescript

// lib/converters/index.ts

import { convertSourceToTarget } from "./your-category";## 📦 Key DependenciesNavigate to http://localhost:3000 and select any tool (e.g., `/tool/docx-to-pdf`, `/tool/jpg-to-png`, `/tool/mp4-to-webm`) to upload files. Conversions happen instantly and download links appear immediately.```powershell



const registry: Record<string, ConverterHandler> = {

  sourceToTarget: convertSourceToTarget,

  // ... other converters- `sharp` - Image processing (replaces ImageMagick)npm install

};

```- `next` - React framework



### 3. Add tool definition- `tailwindcss` - Styling## Environment variablesnpm run dev



```typescript- `framer-motion` - Animations

// lib/tools.ts

{```

  slug: "source-to-target",

  label: "SOURCE → TARGET",## 🎨 Adding New Converters

  description: "Convert SOURCE files to TARGET format.",

  sourceExtensions: [".src"],Create a `.env.local` file (optional):

  targetExtension: ".tgt",

  category: "your-category",1. Add converter function in `lib/converters/images.ts`:

  converter: "sourceToTarget"

}```typescriptIn another terminal, launch the worker:

```

export async function convertNewFormat(job: ConversionJobData) {

## 🔄 Migration from CLI Tools

  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);```bash

This project uses **pure npm packages** instead of system CLI tools:

  await sharp(job.sourcePath)

| CLI Tool | npm Package | Status |

|----------|-------------|--------|    .format('newformat')UPLOADS_DIR=./uploads```powershell

| ImageMagick | `sharp` | ✅ Implemented (18 converters) |

| FFmpeg | - | ❌ Not available (video/audio) |    .toFile(targetPath);

| LibreOffice | `mammoth` (partial) | ⚠️ DOCX only |

| Poppler | `pdf-lib` | ⚠️ Limited PDF features |  return { outputPath: targetPath };NEXT_PUBLIC_BASE_URL=http://localhost:3000npm run worker

| Calibre | - | ❌ Not available (eBooks) |

| 7zip | `archiver`, `adm-zip` | ✅ ZIP only |}

| Tesseract | - | ❌ Not available (OCR) |

`````````

## 💡 Future Enhancements



- [ ] Video conversions (exploring WebAssembly FFmpeg)

- [ ] Audio conversions (exploring WebAssembly solutions)2. Register in `lib/converters/index.ts`:

- [ ] Better PDF text extraction (pdf-parse integration)

- [ ] Image filters and effects (Sharp has built-in support)```typescript

- [ ] Batch conversions (multiple files at once)

- [ ] Cloud storage integration (S3, Google Drive)const registry: Record<string, ConverterHandler> = {## TestingRedis must be running at the URL provided by `REDIS_URL` (default `redis://localhost:6379`). Install Redis locally or point the app to a managed instance.



## 📝 License  // ... existing converters



MIT  newFormat: convertNewFormat



---};



**40+ converters, zero system dependencies!** Everything runs through npm packages.``````powershellNavigate to any tool page (e.g., `/tool/docx-to-pdf`, `/tool/jpg-to-png`, `/tool/mp4-to-webm`) to upload files and download converted results once jobs complete.




3. Add tool definition in `lib/tools.ts`:npm run test

```typescript

{```## Environment variables

  slug: "source-to-target",

  label: "SOURCE → TARGET",

  description: "Your description here",

  sourceExtensions: [".src"],Vitest covers utility helpers and validates that every tool resolves to a registered converter.See `.env.example` for the full list. Copy it to `.env.local` and adjust for your environment.

  targetExtension: ".tgt",

  category: "images",

  converter: "newFormat"

}## Available converters## Testing

```



## 🚀 Roadmap

| Tool | Command | Category |```powershell

Future converter ideas using npm packages only:

- PDF generation (pdf-lib)|------|---------|----------|npm run test

- Document parsing (mammoth for DOCX)

- Spreadsheet conversion (xlsx)| JPG → PNG | `magick` | Images |```

- Archive creation (archiver)

- Image manipulation (filters, resize, crop)| PNG → WEBP | `magick` | Images |



## 📝 License| MP4 → WEBM | `ffmpeg` | Video |Vitest covers utility helpers and validates that every tool resolves to a registered converter.



MIT| WAV → MP3 | `ffmpeg` | Audio |



---| DOCX → PDF | `soffice` | Documents |## Available converters



**No system dependencies required!** Everything runs through npm packages.| XLSX → CSV | `soffice` | Spreadsheets |


| PPTX → PDF | `soffice` | Presentations || Tool | Command | Category |

| PDF → TXT | `pdftotext` | PDF ||------|---------|----------|

| EPUB → MOBI | `ebook-convert` | eBooks || JPG → PNG | `magick` | Images |

| ZIP → 7Z | `7z` | Archives || PNG → WEBP | `magick` | Images |

| Image → Text (OCR) | `tesseract` | OCR || MP4 → WEBM | `ffmpeg` | Video |

| WAV → MP3 | `ffmpeg` | Audio |

## Adding new converters| DOCX → PDF | `soffice` | Documents |

| XLSX → CSV | `soffice` | Spreadsheets |

1. Create a handler in `lib/converters/` that accepts `ConversionJobData` and returns an `outputPath`.| PPTX → PDF | `soffice` | Presentations |

2. Register the handler in `lib/converters/index.ts`.| PDF → TXT | `pdftotext` | PDF |

3. Add a `ConversionToolDefinition` entry in `lib/tools.ts` with metadata and extensions.| EPUB → MOBI | `ebook-convert` | eBooks |

| ZIP → 7Z | `7z` | Archives |

## Roadmap ideas| Image → Text (OCR) | `tesseract` | OCR |



- S3 + signed URL storage adapters## Adding new converters

- Webhooks / email notifications

- Usage analytics dashboard1. Create a handler in `lib/converters/` that accepts `ConversionJobData` and returns an `outputPath`.

- Multi-tenant billing and metering2. Register the handler in `lib/converters/index.ts`.

3. Add a `ConversionToolDefinition` entry in `lib/tools.ts` with metadata and extensions.

## License4. Rebuild the worker (or restart in dev) so it picks up the new converter.



## Roadmap ideas

- S3 + signed URL storage adapters
- Webhooks / email notifications
- Usage analytics dashboard
- Multi-tenant billing and metering

---

## 📧 Contact

**W Software Solutions**
- GitHub: [@Wasif-Ansari](https://github.com/Wasif-Ansari)
- Repository: [ultimateconvertor](https://github.com/Wasif-Ansari/ultimateconvertor)
- Email: contact@wsoftwaresolutions.com
- Support: support@wsoftwaresolutions.com

---

## 📄 License

© 2025 W Software Solutions. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without express written permission from W Software Solutions.

---

**Made with ❤️ by W Software Solutions**

Enjoy converting!
