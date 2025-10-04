# Ultimate File Converter 🚀

A comprehensive Next.js 14 file converter supporting **120+ conversion tools** - the most complete file converter available!

## ✨ Features

- 🖼️ **17 Image conversions**: JPG, PNG, WEBP, TIFF, AVIF - all formats supported
- 📄 **19 Document conversions**: DOCX↔PDF, DOCX↔ODT, DOCX↔RTF, PDF↔DOCX, Markdown, HTML
- 📊 **9 Spreadsheet conversions**: XLSX, CSV, JSON, HTML
- 📽️ **4 Presentation tools**: Create PPTX from TXT, JSON, CSV, Markdown
- 🎬 **2 Media metadata tools**: Extract info from video/audio files
- 📦 **2 Archive operations**: ZIP creation and listing
- 🎥 **21 Video conversions**: Format changes, resolution, FPS, audio extraction, GIF creation (requires FFmpeg)
- 🎵 **35 Audio conversions**: Format changes, bitrate, channels, sample rates (requires FFmpeg)
- 🔍 **2 OCR tools**: Image-to-searchable-PDF, Image-to-text using Tesseract
- 🚀 **Instant processing**: Synchronous conversions with no queue delays
- 📂 **Drag-and-drop uploads**: Live progress and secure downloads
- 🎨 **Beautiful UI**: Tailwind CSS with smooth animations
- ⚡ **Easy deployment**: Optimized for Render with FFmpeg support

## 🛠️ Tech Stack

- **Next.js 14** - App Router with TypeScript
- **Sharp** - High-performance image processing
- **pdf-lib & jsPDF** - PDF generation and manipulation
- **pptxgenjs** - PowerPoint presentation generation
- **xlsx** - Excel/CSV/JSON spreadsheet conversions
- **mammoth** - DOCX to HTML/TXT extraction
- **archiver & adm-zip** - Archive operations
- **fluent-ffmpeg** - Video and audio processing (requires FFmpeg)
- **marked & jsdom** - Markdown and HTML processing
- **Tesseract.js** - OCR (Optical Character Recognition)
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

## 🚀 Quick Start

### Local Development (Without FFmpeg)

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start converting!

**Note**: Video/audio converters require FFmpeg. Install it locally or deploy to Render (FFmpeg included).

### Deploy to Render (With FFmpeg)

See [DEPLOY_RENDER.md](./DEPLOY_RENDER.md) for complete deployment instructions. Render includes FFmpeg by default!

## 📋 All Available Converters (120 tools)

### 🖼️ Images (17 converters)

| From | To | Description |
|------|-----|-------------|
| JPG | PNG, WEBP, TIFF, AVIF | Convert JPEG to various formats |
| PNG | JPG, WEBP, TIFF, AVIF | Convert PNG to various formats |
| WEBP | PNG, JPG, TIFF | Convert WEBP to various formats |
| TIFF | PNG, JPG, WEBP | Convert TIFF to various formats |
| AVIF | PNG, JPG, WEBP | Convert next-gen AVIF format |

**Supported formats**: JPG, PNG, WEBP, TIFF, AVIF

### 📄 Documents (19 converters)

| From | To | Description |
|------|-----|-------------|
| DOCX | TXT, HTML, PDF, ODT, RTF | Convert Word to multiple formats including PDF |
| ODT | DOCX | Convert OpenDocument to Word |
| RTF | DOCX | Convert Rich Text to Word |
| TXT | PDF | Generate PDF from plain text |
| PDF | TXT, DOCX, RTF | Extract text or convert to editable formats |
| HTML | TXT, DOCX, RTF | Convert web pages to documents |
| Markdown | HTML, TXT, DOCX, RTF | Convert Markdown to various formats |
| Image | PDF | Convert JPG/PNG to PDF document |

**Supported formats**: DOCX, ODT, RTF, PDF, TXT, HTML, MD

**PDF Operations (included in Documents):**
- PDF → Text/JSON/HTML/DOCX/RTF (extract & convert)
- PDF Optimize (compress file size)
- PDF Info (metadata extraction)
- PDF Split (individual pages)
- HTML/Image → PDF (create PDFs)

**Format Conversions:**
- DOCX ↔ ODT (OpenDocument)
- DOCX ↔ RTF (Rich Text Format)
- PDF → DOCX/RTF/TXT/HTML (editable conversions)
- Markdown → DOCX/RTF/HTML/TXT
- HTML → DOCX/RTF/TXT/PDF
- Image → PDF

### 📊 Spreadsheets (9 converters)

| From | To | Description |
|------|-----|-------------|
| XLSX | CSV, TXT, HTML, JSON | Convert Excel to multiple formats |
| CSV | XLSX, JSON, HTML | Convert CSV to Excel, JSON, or HTML |
| JSON | XLSX, CSV | Convert JSON data to spreadsheet formats |

**Supported formats**: XLSX, CSV, JSON, HTML

### 📽️ Presentations (4 tools)

| From | To | Description |
|------|-----|-------------|
| TXT | PPTX | Create PowerPoint from text files |
| JSON | PPTX | Generate slides from JSON data |
| CSV | PPTX | Create presentations from CSV data |
| Markdown | PPTX | Convert Markdown to PowerPoint |

**Features**: Auto-generated slides with formatting

### � Video (21 converters)

| From | To | Description |
|------|-----|-------------|
| MP4 | MOV, AVI, MKV, WebM | Convert MP4 to various video formats |
| MOV | MP4, MKV | Convert QuickTime to other formats |
| AVI | MP4 | Convert AVI to modern MP4 format |
| MKV | MP4 | Convert Matroska to MP4 |
| Video | GIF | Create animated GIF from video (first 5 seconds) |
| Video | MP3, WAV, AAC, OGG | Extract audio from videos |
| Any | 1080p, 720p, 480p | Change video resolution |
| Any | 30fps, 24fps, 60fps | Adjust frame rate |
| Any | Optimized MP4 | Optimize for web (720p, reduced bitrate) |

**Supported formats**: MP4, MOV, AVI, MKV, WebM  
**Requires**: FFmpeg (available on Render deployment)

### 🎵 Audio (35 converters)

| From | To | Description |
|------|-----|-------------|
| MP3 | WAV, AAC, OGG, FLAC | Convert from MP3 to various formats |
| WAV | MP3, AAC, OGG, FLAC | Convert from uncompressed WAV |
| AAC/M4A | MP3, WAV, OGG, FLAC | Convert from AAC format |
| OGG | MP3, WAV, AAC, FLAC | Convert from OGG Vorbis |
| FLAC | MP3, WAV, AAC, OGG | Convert from lossless FLAC |
| Any | 128k, 192k, 320k | Adjust bitrate/quality |
| Any | Mono, Stereo | Change audio channels |
| Any | 44.1kHz, 48kHz, 96kHz | Change sample rate |
| Any | Web MP3, Web AAC | Optimize for web playback |

**Supported formats**: MP3, WAV, AAC, M4A, OGG, FLAC  
**Requires**: FFmpeg (available on Render deployment)

### 🎬 Media Info (2 tools)

| Operation | Description |
|-----------|-------------|
| Media Info | Extract metadata from video/audio files |
| Media → TXT | Export media metadata to text format |

### � OCR (2 tools)

| Operation | Description |
|-----------|-------------|
| Image → Searchable PDF | OCR image and create searchable PDF with invisible text layer |
| Image → Text | Extract text from image using Tesseract OCR |

**Supported formats**: JPG, PNG  
**Technology**: Tesseract.js (client-side OCR)  
**Languages**: English (default), 100+ languages supported

**Features:**
- Automatically recognize text in images
- Create searchable PDFs from scanned documents
- Extract text with confidence scores
- Works offline - no external API needed

### �📦 Archives (2 converters)

| From | To | Description |
|------|-----|-------------|
| File | ZIP | Create a ZIP archive from any file |
| ZIP | TXT | List ZIP archive contents |

**Supported formats**: ZIP

## 🎯 How It Works

1. **Select a tool** from 119+ available converters
2. **Upload your file** via drag-and-drop or file browser
3. **Instant conversion** happens server-side using Node.js libraries
4. **Download** your converted file immediately

All conversions run synchronously - no queues, no waiting!

## ⚡ FFmpeg Requirements

**Video/Audio converters require FFmpeg:**
- ✅ **Render**: FFmpeg included by default (recommended)
- ❌ **Vercel**: FFmpeg not available (use Render instead)
- 💻 **Local**: Install FFmpeg separately for testing

All other converters work anywhere without system dependencies!

## 📁 Project Structure

```
app/
  ├── page.tsx              # Home page with category cards
  ├── category/[slug]/      # Category listing pages
  ├── tool/[slug]/          # Individual tool pages with upload UI
  └── api/jobs/             # Conversion API endpoints

components/
  ├── tool-upload.tsx       # Drag-and-drop upload component
  ├── progress-bar.tsx      # Progress indicator
  └── category-card.tsx     # Category display cards

lib/
  ├── converters/
  │   ├── index.ts          # Converter registry
  │   ├── images.ts         # Sharp-based image converters (17)
  │   ├── documents.ts      # Document converters (7)
  │   ├── pdf.ts            # PDF operations (8)
  │   ├── spreadsheets.ts   # Spreadsheet converters (9)
  │   ├── presentations.ts  # PPTX generators (4)
  │   ├── media.ts          # Media metadata extractors (2)
  │   └── archive.ts        # Archive operations (2)
  ├── tools.ts              # All 49 tool definitions
  ├── categories.ts         # 10 category definitions
  └── storage.ts            # File system operations

uploads/                    # Local file storage
```

## 🔧 Environment Variables

Optional `.env.local`:

```bash
UPLOADS_DIR=./uploads
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📦 Key npm Packages

- `sharp` ^0.33.0 - Image processing (replaces ImageMagick)
- `pdf-lib` ^1.17.1 - PDF generation and manipulation
- `jspdf` ^2.5.2 - Additional PDF generation
- `pptxgenjs` ^3.12.0 - PowerPoint generation
- `xlsx` ^0.18.5 - Spreadsheet processing (replaces LibreOffice)
- `mammoth` ^1.6.0 - DOCX text extraction
- `archiver` ^6.0.1 - ZIP creation
- `adm-zip` ^0.5.10 - ZIP extraction

## 🧪 Testing

```powershell
npm run test
```

## 🌐 Deployment

### Render (Recommended for Full Features) ⭐

**Why Render?**
- ✅ **Built-in FFmpeg support** - Add video/audio conversion later
- ✅ **Free tier** - 750 hours/month
- ✅ **Persistent disk** - For file uploads
- ✅ **Auto-deploy** - Push to GitHub to deploy

**Quick Deploy:**

```powershell
# 1. Push to GitHub
git add .
git commit -m "Deploy to Render"
git push

# 2. Go to https://dashboard.render.com
# 3. Click "New +" → "Blueprint"
# 4. Connect your repository
# 5. Deploy automatically with render.yaml
```

📖 **Detailed Guide**: See [DEPLOY_RENDER.md](./DEPLOY_RENDER.md)

---

### Vercel (For Current Features Only)

**Note**: Vercel doesn't support FFmpeg, so video/audio conversion won't work.

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with zero configuration!

**Current 49 converters work perfectly on Vercel.**

---

### Other Platforms

| Platform | FFmpeg Support | Free Tier | Best For |
|----------|---------------|-----------|----------|
| **Render** | ✅ Built-in | 750 hrs/mo | Full features |
| **Railway** | ✅ Built-in | $5 credit | FFmpeg needed |
| **Fly.io** | ✅ Docker | Yes | Global edge |
| **Vercel** | ❌ No | Unlimited | Current features |
| **Netlify** | ❌ No | Unlimited | Current features |

**For video/audio conversion, use Render, Railway, or Fly.io.**

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new converters
- Improve UI/UX
- Fix bugs
- Add tests
- Improve documentation

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Sharp](https://sharp.pixelplumbing.com/)
- [pdf-lib](https://pdf-lib.js.org/)
- [PptxGenJS](https://gitbrent.github.io/PptxGenJS/)
- [SheetJS](https://sheetjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ using Next.js 14 and TypeScript
