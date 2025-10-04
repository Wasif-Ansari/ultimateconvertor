import { conversionCategories } from "./categories";
import type {
  ConversionCategory,
  ConversionCategoryKey,
  ConversionToolDefinition
} from "./types";

export const conversionTools: ConversionToolDefinition[] = [
  // Image conversions - JPG source
  {
    slug: "jpg-to-png",
    label: "JPG → PNG",
    description: "Convert JPEG to lossless PNG format.",
    sourceExtensions: [".jpg", ".jpeg"],
    targetExtension: ".png",
    category: "images",
    converter: "jpgToPng"
  },
  {
    slug: "jpg-to-webp",
    label: "JPG → WEBP",
    description: "Convert JPEG to modern WEBP format with better compression.",
    sourceExtensions: [".jpg", ".jpeg"],
    targetExtension: ".webp",
    category: "images",
    converter: "jpgToWebp"
  },
  {
    slug: "jpg-to-tiff",
    label: "JPG → TIFF",
    description: "Convert JPEG to TIFF format for professional printing.",
    sourceExtensions: [".jpg", ".jpeg"],
    targetExtension: ".tiff",
    category: "images",
    converter: "jpgToTiff"
  },
  {
    slug: "jpg-to-avif",
    label: "JPG → AVIF",
    description: "Convert JPEG to next-gen AVIF format.",
    sourceExtensions: [".jpg", ".jpeg"],
    targetExtension: ".avif",
    category: "images",
    converter: "jpgToAvif"
  },
  
  // Image conversions - PNG source
  {
    slug: "png-to-jpg",
    label: "PNG → JPG",
    description: "Convert PNG to JPEG for smaller file sizes.",
    sourceExtensions: [".png"],
    targetExtension: ".jpg",
    category: "images",
    converter: "pngToJpg"
  },
  {
    slug: "png-to-webp",
    label: "PNG → WEBP",
    description: "Convert PNG to WEBP with excellent compression.",
    sourceExtensions: [".png"],
    targetExtension: ".webp",
    category: "images",
    converter: "pngToWebp"
  },
  {
    slug: "png-to-tiff",
    label: "PNG → TIFF",
    description: "Convert PNG to TIFF format.",
    sourceExtensions: [".png"],
    targetExtension: ".tiff",
    category: "images",
    converter: "pngToTiff"
  },
  {
    slug: "png-to-avif",
    label: "PNG → AVIF",
    description: "Convert PNG to AVIF format.",
    sourceExtensions: [".png"],
    targetExtension: ".avif",
    category: "images",
    converter: "pngToAvif"
  },
  
  // Image conversions - WEBP source
  {
    slug: "webp-to-png",
    label: "WEBP → PNG",
    description: "Convert WEBP to PNG format.",
    sourceExtensions: [".webp"],
    targetExtension: ".png",
    category: "images",
    converter: "webpToPng"
  },
  {
    slug: "webp-to-jpg",
    label: "WEBP → JPG",
    description: "Convert WEBP to JPEG format.",
    sourceExtensions: [".webp"],
    targetExtension: ".jpg",
    category: "images",
    converter: "webpToJpg"
  },
  {
    slug: "webp-to-tiff",
    label: "WEBP → TIFF",
    description: "Convert WEBP to TIFF format.",
    sourceExtensions: [".webp"],
    targetExtension: ".tiff",
    category: "images",
    converter: "webpToTiff"
  },
  
  // Image conversions - TIFF source
  {
    slug: "tiff-to-png",
    label: "TIFF → PNG",
    description: "Convert TIFF to PNG format.",
    sourceExtensions: [".tiff", ".tif"],
    targetExtension: ".png",
    category: "images",
    converter: "tiffToPng"
  },
  {
    slug: "tiff-to-jpg",
    label: "TIFF → JPG",
    description: "Convert TIFF to JPEG format.",
    sourceExtensions: [".tiff", ".tif"],
    targetExtension: ".jpg",
    category: "images",
    converter: "tiffToJpg"
  },
  {
    slug: "tiff-to-webp",
    label: "TIFF → WEBP",
    description: "Convert TIFF to WEBP format.",
    sourceExtensions: [".tiff", ".tif"],
    targetExtension: ".webp",
    category: "images",
    converter: "tiffToWebp"
  },
  
  // Image conversions - AVIF source
  {
    slug: "avif-to-png",
    label: "AVIF → PNG",
    description: "Convert AVIF to PNG format.",
    sourceExtensions: [".avif"],
    targetExtension: ".png",
    category: "images",
    converter: "avifToPng"
  },
  {
    slug: "avif-to-jpg",
    label: "AVIF → JPG",
    description: "Convert AVIF to JPEG format.",
    sourceExtensions: [".avif"],
    targetExtension: ".jpg",
    category: "images",
    converter: "avifToJpg"
  },
  {
    slug: "avif-to-webp",
    label: "AVIF → WEBP",
    description: "Convert AVIF to WEBP format.",
    sourceExtensions: [".avif"],
    targetExtension: ".webp",
    category: "images",
    converter: "avifToWebp"
  },
  
  // Document conversions
  {
    slug: "docx-to-txt",
    label: "DOCX → TXT",
    description: "Extract text from Word documents.",
    sourceExtensions: [".docx"],
    targetExtension: ".txt",
    category: "documents",
    converter: "docxToTxt"
  },
  {
    slug: "docx-to-html",
    label: "DOCX → HTML",
    description: "Convert Word documents to HTML.",
    sourceExtensions: [".docx"],
    targetExtension: ".html",
    category: "documents",
    converter: "docxToHtml"
  },
  {
    slug: "docx-to-pdf",
    label: "DOCX → PDF",
    description: "Convert Word documents to PDF format.",
    sourceExtensions: [".docx"],
    targetExtension: ".pdf",
    category: "documents",
    converter: "docxToPdf"
  },
  {
    slug: "txt-to-pdf",
    label: "TXT → PDF",
    description: "Convert text files to PDF documents.",
    sourceExtensions: [".txt"],
    targetExtension: ".pdf",
    category: "documents",
    converter: "txtToPdf"
  },
  {
    slug: "pdf-to-txt",
    label: "PDF → TXT",
    description: "Extract full text content from PDF files with metadata.",
    sourceExtensions: [".pdf"],
    targetExtension: ".txt",
    category: "documents",
    converter: "pdfToTxt"
  },
  {
    slug: "html-to-txt",
    label: "HTML → TXT",
    description: "Extract text from HTML files.",
    sourceExtensions: [".html", ".htm"],
    targetExtension: ".txt",
    category: "documents",
    converter: "htmlToTxt"
  },
  {
    slug: "md-to-html",
    label: "MD → HTML",
    description: "Convert Markdown to HTML.",
    sourceExtensions: [".md", ".markdown"],
    targetExtension: ".html",
    category: "documents",
    converter: "mdToHtml"
  },
  {
    slug: "md-to-txt",
    label: "MD → TXT",
    description: "Convert Markdown to plain text.",
    sourceExtensions: [".md", ".markdown"],
    targetExtension: ".txt",
    category: "documents",
    converter: "mdToTxt"
  },
  
  // Advanced Document Conversions
  {
    slug: "docx-to-odt",
    label: "DOCX → ODT",
    description: "Convert Microsoft Word to OpenDocument Text format.",
    sourceExtensions: [".docx"],
    targetExtension: ".odt",
    category: "documents",
    converter: "docxToOdt"
  },
  {
    slug: "docx-to-rtf",
    label: "DOCX → RTF",
    description: "Convert Word document to Rich Text Format.",
    sourceExtensions: [".docx"],
    targetExtension: ".rtf",
    category: "documents",
    converter: "docxToRtf"
  },
  {
    slug: "odt-to-docx",
    label: "ODT → DOCX",
    description: "Convert OpenDocument to Microsoft Word format.",
    sourceExtensions: [".odt"],
    targetExtension: ".docx",
    category: "documents",
    converter: "odtToDocx"
  },
  {
    slug: "rtf-to-docx",
    label: "RTF → DOCX",
    description: "Convert Rich Text Format to Word document.",
    sourceExtensions: [".rtf"],
    targetExtension: ".docx",
    category: "documents",
    converter: "rtfToDocx"
  },
  {
    slug: "pdf-to-docx",
    label: "PDF → DOCX",
    description: "Convert PDF to editable Word document.",
    sourceExtensions: [".pdf"],
    targetExtension: ".docx",
    category: "documents",
    converter: "pdfToDocx"
  },
  {
    slug: "pdf-to-rtf",
    label: "PDF → RTF",
    description: "Convert PDF to Rich Text Format.",
    sourceExtensions: [".pdf"],
    targetExtension: ".rtf",
    category: "documents",
    converter: "pdfToRtf"
  },
  {
    slug: "images-to-pdf",
    label: "Image → PDF",
    description: "Convert image to PDF document (JPG, PNG).",
    sourceExtensions: [".jpg", ".jpeg", ".png"],
    targetExtension: ".pdf",
    category: "documents",
    converter: "imagesToPdf"
  },
  {
    slug: "md-to-docx",
    label: "MD → DOCX",
    description: "Convert Markdown to Word document.",
    sourceExtensions: [".md", ".markdown"],
    targetExtension: ".docx",
    category: "documents",
    converter: "mdToDocx"
  },
  {
    slug: "md-to-rtf",
    label: "MD → RTF",
    description: "Convert Markdown to Rich Text Format.",
    sourceExtensions: [".md", ".markdown"],
    targetExtension: ".rtf",
    category: "documents",
    converter: "mdToRtf"
  },
  {
    slug: "html-to-docx",
    label: "HTML → DOCX",
    description: "Convert HTML to Word document.",
    sourceExtensions: [".html", ".htm"],
    targetExtension: ".docx",
    category: "documents",
    converter: "htmlToDocx"
  },
  {
    slug: "html-to-rtf",
    label: "HTML → RTF",
    description: "Convert HTML to Rich Text Format.",
    sourceExtensions: [".html", ".htm"],
    targetExtension: ".rtf",
    category: "documents",
    converter: "htmlToRtf"
  },
  
  // OCR Tools
  {
    slug: "image-to-searchable-pdf",
    label: "Image → Searchable PDF (OCR)",
    description: "OCR image and create searchable PDF with text layer using Tesseract.",
    sourceExtensions: [".jpg", ".jpeg", ".png"],
    targetExtension: ".pdf",
    category: "ocr",
    converter: "imageToSearchablePdf"
  },
  {
    slug: "image-to-text-ocr",
    label: "Image → Text (OCR)",
    description: "Extract text from image using OCR (Tesseract).",
    sourceExtensions: [".jpg", ".jpeg", ".png"],
    targetExtension: ".txt",
    category: "ocr",
    converter: "imageToTextOcr"
  },
  
  // PDF conversions
  {
    slug: "pdf-to-json",
    label: "PDF → JSON",
    description: "Extract PDF metadata and structure to JSON.",
    sourceExtensions: [".pdf"],
    targetExtension: ".json",
    category: "documents",
    converter: "pdfToJson"
  },
  {
    slug: "pdf-optimize",
    label: "Optimize PDF",
    description: "Compress and optimize PDF file size.",
    sourceExtensions: [".pdf"],
    targetExtension: ".pdf",
    category: "documents",
    converter: "pdfOptimize"
  },
  {
    slug: "html-to-pdf",
    label: "HTML → PDF",
    description: "Convert HTML documents to PDF.",
    sourceExtensions: [".html", ".htm"],
    targetExtension: ".pdf",
    category: "documents",
    converter: "htmlToPdf"
  },
  {
    slug: "image-to-pdf",
    label: "Image → PDF",
    description: "Convert images (JPG, PNG, WEBP) to PDF.",
    sourceExtensions: [".jpg", ".jpeg", ".png", ".webp"],
    targetExtension: ".pdf",
    category: "documents",
    converter: "imageToPdf"
  },
  {
    slug: "pdf-info",
    label: "PDF Info",
    description: "Extract detailed PDF metadata and information.",
    sourceExtensions: [".pdf"],
    targetExtension: ".json",
    category: "documents",
    converter: "pdfInfo"
  },
  {
    slug: "pdf-to-html",
    label: "PDF → HTML",
    description: "Convert PDF to beautifully formatted HTML with full text extraction.",
    sourceExtensions: [".pdf"],
    targetExtension: ".html",
    category: "documents",
    converter: "pdfToHtml"
  },
  {
    slug: "pdf-split",
    label: "Split PDF",
    description: "Split PDF into individual page files.",
    sourceExtensions: [".pdf"],
    targetExtension: ".pdf",
    category: "documents",
    converter: "pdfSplit"
  },
  
  // Presentation conversions
  {
    slug: "txt-to-pptx",
    label: "TXT → PPTX",
    description: "Convert text file to PowerPoint presentation.",
    sourceExtensions: [".txt"],
    targetExtension: ".pptx",
    category: "presentations",
    converter: "txtToPptx"
  },
  {
    slug: "json-to-pptx",
    label: "JSON → PPTX",
    description: "Convert JSON data to PowerPoint slides.",
    sourceExtensions: [".json"],
    targetExtension: ".pptx",
    category: "presentations",
    converter: "jsonToPptx"
  },
  {
    slug: "csv-to-pptx",
    label: "CSV → PPTX",
    description: "Convert CSV data to PowerPoint presentation.",
    sourceExtensions: [".csv"],
    targetExtension: ".pptx",
    category: "presentations",
    converter: "csvToPptx"
  },
  {
    slug: "md-to-pptx",
    label: "MD → PPTX",
    description: "Convert Markdown to PowerPoint presentation.",
    sourceExtensions: [".md", ".markdown"],
    targetExtension: ".pptx",
    category: "presentations",
    converter: "mdToPptx"
  },
  
  // Video format conversions
  {
    slug: "mp4-to-mov",
    label: "MP4 → MOV",
    description: "Convert MP4 to MOV (QuickTime) format.",
    sourceExtensions: [".mp4"],
    targetExtension: ".mov",
    category: "videos",
    converter: "mp4ToMov"
  },
  {
    slug: "mp4-to-avi",
    label: "MP4 → AVI",
    description: "Convert MP4 to AVI format.",
    sourceExtensions: [".mp4"],
    targetExtension: ".avi",
    category: "videos",
    converter: "mp4ToAvi"
  },
  {
    slug: "mp4-to-mkv",
    label: "MP4 → MKV",
    description: "Convert MP4 to MKV (Matroska) format.",
    sourceExtensions: [".mp4"],
    targetExtension: ".mkv",
    category: "videos",
    converter: "mp4ToMkv"
  },
  {
    slug: "mp4-to-webm",
    label: "MP4 → WebM",
    description: "Convert MP4 to WebM for web optimization.",
    sourceExtensions: [".mp4"],
    targetExtension: ".webm",
    category: "videos",
    converter: "mp4ToWebm"
  },
  {
    slug: "mov-to-mp4",
    label: "MOV → MP4",
    description: "Convert MOV to MP4 format.",
    sourceExtensions: [".mov"],
    targetExtension: ".mp4",
    category: "videos",
    converter: "movToMp4"
  },
  {
    slug: "mov-to-mkv",
    label: "MOV → MKV",
    description: "Convert MOV to MKV format.",
    sourceExtensions: [".mov"],
    targetExtension: ".mkv",
    category: "videos",
    converter: "movToMkv"
  },
  {
    slug: "avi-to-mp4",
    label: "AVI → MP4",
    description: "Convert AVI to MP4 format.",
    sourceExtensions: [".avi"],
    targetExtension: ".mp4",
    category: "videos",
    converter: "aviToMp4"
  },
  {
    slug: "mkv-to-mp4",
    label: "MKV → MP4",
    description: "Convert MKV to MP4 format.",
    sourceExtensions: [".mkv"],
    targetExtension: ".mp4",
    category: "videos",
    converter: "mkvToMp4"
  },
  {
    slug: "video-to-gif",
    label: "Video → GIF",
    description: "Convert short video clips to GIF (first 5 seconds).",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".gif",
    category: "videos",
    converter: "videoToGif"
  },
  
  // Video to audio extraction
  {
    slug: "video-to-mp3",
    label: "Video → MP3",
    description: "Extract audio from video as MP3.",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".mp3",
    category: "videos",
    converter: "videoToMp3"
  },
  {
    slug: "video-to-wav",
    label: "Video → WAV",
    description: "Extract audio from video as WAV.",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".wav",
    category: "videos",
    converter: "videoToWav"
  },
  {
    slug: "video-to-aac",
    label: "Video → AAC",
    description: "Extract audio from video as AAC.",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".aac",
    category: "videos",
    converter: "videoToAac"
  },
  {
    slug: "video-to-ogg",
    label: "Video → OGG",
    description: "Extract audio from video as OGG.",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".ogg",
    category: "videos",
    converter: "videoToOgg"
  },
  
  // Video quality/resolution
  {
    slug: "video-to-1080p",
    label: "Video → 1080p",
    description: "Convert video to 1080p (Full HD) resolution.",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".mp4",
    category: "videos",
    converter: "videoTo1080p"
  },
  {
    slug: "video-to-720p",
    label: "Video → 720p",
    description: "Convert video to 720p (HD) resolution.",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".mp4",
    category: "videos",
    converter: "videoTo720p"
  },
  {
    slug: "video-to-480p",
    label: "Video → 480p",
    description: "Convert video to 480p (SD) resolution.",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".mp4",
    category: "videos",
    converter: "videoTo480p"
  },
  
  // Video frame rate
  {
    slug: "video-to-30fps",
    label: "Video → 30fps",
    description: "Convert video to 30 frames per second.",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".mp4",
    category: "videos",
    converter: "videoTo30fps"
  },
  {
    slug: "video-to-24fps",
    label: "Video → 24fps",
    description: "Convert video to 24 frames per second (cinematic).",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".mp4",
    category: "videos",
    converter: "videoTo24fps"
  },
  {
    slug: "video-to-60fps",
    label: "Video → 60fps",
    description: "Convert video to 60 frames per second (smooth).",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".mp4",
    category: "videos",
    converter: "videoTo60fps"
  },
  {
    slug: "optimize-video",
    label: "Optimize Video",
    description: "Optimize video for web (720p, reduced bitrate, fast start).",
    sourceExtensions: [".mp4", ".mov", ".avi", ".mkv"],
    targetExtension: ".mp4",
    category: "videos",
    converter: "optimizeVideo"
  },
  
  // Audio format conversions - MP3 source
  {
    slug: "mp3-to-wav",
    label: "MP3 → WAV",
    description: "Convert MP3 to uncompressed WAV format.",
    sourceExtensions: [".mp3"],
    targetExtension: ".wav",
    category: "audio",
    converter: "mp3ToWav"
  },
  {
    slug: "mp3-to-aac",
    label: "MP3 → AAC",
    description: "Convert MP3 to AAC format.",
    sourceExtensions: [".mp3"],
    targetExtension: ".aac",
    category: "audio",
    converter: "mp3ToAac"
  },
  {
    slug: "mp3-to-ogg",
    label: "MP3 → OGG",
    description: "Convert MP3 to OGG Vorbis format.",
    sourceExtensions: [".mp3"],
    targetExtension: ".ogg",
    category: "audio",
    converter: "mp3ToOgg"
  },
  {
    slug: "mp3-to-flac",
    label: "MP3 → FLAC",
    description: "Convert MP3 to lossless FLAC format.",
    sourceExtensions: [".mp3"],
    targetExtension: ".flac",
    category: "audio",
    converter: "mp3ToFlac"
  },
  
  // Audio format conversions - WAV source
  {
    slug: "wav-to-mp3",
    label: "WAV → MP3",
    description: "Convert WAV to compressed MP3 format.",
    sourceExtensions: [".wav"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "wavToMp3"
  },
  {
    slug: "wav-to-aac",
    label: "WAV → AAC",
    description: "Convert WAV to AAC format.",
    sourceExtensions: [".wav"],
    targetExtension: ".aac",
    category: "audio",
    converter: "wavToAac"
  },
  {
    slug: "wav-to-ogg",
    label: "WAV → OGG",
    description: "Convert WAV to OGG Vorbis format.",
    sourceExtensions: [".wav"],
    targetExtension: ".ogg",
    category: "audio",
    converter: "wavToOgg"
  },
  {
    slug: "wav-to-flac",
    label: "WAV → FLAC",
    description: "Convert WAV to lossless FLAC format.",
    sourceExtensions: [".wav"],
    targetExtension: ".flac",
    category: "audio",
    converter: "wavToFlac"
  },
  
  // Audio format conversions - AAC source
  {
    slug: "aac-to-mp3",
    label: "AAC → MP3",
    description: "Convert AAC to MP3 format.",
    sourceExtensions: [".aac", ".m4a"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "aacToMp3"
  },
  {
    slug: "aac-to-wav",
    label: "AAC → WAV",
    description: "Convert AAC to uncompressed WAV format.",
    sourceExtensions: [".aac", ".m4a"],
    targetExtension: ".wav",
    category: "audio",
    converter: "aacToWav"
  },
  {
    slug: "aac-to-ogg",
    label: "AAC → OGG",
    description: "Convert AAC to OGG Vorbis format.",
    sourceExtensions: [".aac", ".m4a"],
    targetExtension: ".ogg",
    category: "audio",
    converter: "aacToOgg"
  },
  {
    slug: "aac-to-flac",
    label: "AAC → FLAC",
    description: "Convert AAC to lossless FLAC format.",
    sourceExtensions: [".aac", ".m4a"],
    targetExtension: ".flac",
    category: "audio",
    converter: "aacToFlac"
  },
  
  // Audio format conversions - OGG source
  {
    slug: "ogg-to-mp3",
    label: "OGG → MP3",
    description: "Convert OGG to MP3 format.",
    sourceExtensions: [".ogg"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "oggToMp3"
  },
  {
    slug: "ogg-to-wav",
    label: "OGG → WAV",
    description: "Convert OGG to uncompressed WAV format.",
    sourceExtensions: [".ogg"],
    targetExtension: ".wav",
    category: "audio",
    converter: "oggToWav"
  },
  {
    slug: "ogg-to-aac",
    label: "OGG → AAC",
    description: "Convert OGG to AAC format.",
    sourceExtensions: [".ogg"],
    targetExtension: ".aac",
    category: "audio",
    converter: "oggToAac"
  },
  {
    slug: "ogg-to-flac",
    label: "OGG → FLAC",
    description: "Convert OGG to lossless FLAC format.",
    sourceExtensions: [".ogg"],
    targetExtension: ".flac",
    category: "audio",
    converter: "oggToFlac"
  },
  
  // Audio format conversions - FLAC source
  {
    slug: "flac-to-mp3",
    label: "FLAC → MP3",
    description: "Convert FLAC to compressed MP3 format.",
    sourceExtensions: [".flac"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "flacToMp3"
  },
  {
    slug: "flac-to-wav",
    label: "FLAC → WAV",
    description: "Convert FLAC to uncompressed WAV format.",
    sourceExtensions: [".flac"],
    targetExtension: ".wav",
    category: "audio",
    converter: "flacToWav"
  },
  {
    slug: "flac-to-aac",
    label: "FLAC → AAC",
    description: "Convert FLAC to AAC format.",
    sourceExtensions: [".flac"],
    targetExtension: ".aac",
    category: "audio",
    converter: "flacToAac"
  },
  {
    slug: "flac-to-ogg",
    label: "FLAC → OGG",
    description: "Convert FLAC to OGG Vorbis format.",
    sourceExtensions: [".flac"],
    targetExtension: ".ogg",
    category: "audio",
    converter: "flacToOgg"
  },
  
  // Audio quality conversions
  {
    slug: "audio-to-128k",
    label: "Audio → 128kbps",
    description: "Reduce audio bitrate to 128kbps for smaller file size.",
    sourceExtensions: [".mp3", ".wav", ".aac", ".ogg", ".flac"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "audioTo128k"
  },
  {
    slug: "audio-to-192k",
    label: "Audio → 192kbps",
    description: "Convert audio to 192kbps (good quality).",
    sourceExtensions: [".mp3", ".wav", ".aac", ".ogg", ".flac"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "audioTo192k"
  },
  {
    slug: "audio-to-320k",
    label: "Audio → 320kbps",
    description: "Convert audio to 320kbps (high quality).",
    sourceExtensions: [".mp3", ".wav", ".aac", ".ogg", ".flac"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "audioTo320k"
  },
  
  // Audio channel conversions
  {
    slug: "audio-to-mono",
    label: "Audio → Mono",
    description: "Convert stereo audio to mono (single channel).",
    sourceExtensions: [".mp3", ".wav", ".aac", ".ogg", ".flac"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "audioToMono"
  },
  {
    slug: "audio-to-stereo",
    label: "Audio → Stereo",
    description: "Convert mono audio to stereo (dual channel).",
    sourceExtensions: [".mp3", ".wav", ".aac", ".ogg", ".flac"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "audioToStereo"
  },
  
  // Audio sample rate conversions
  {
    slug: "audio-to-44100hz",
    label: "Audio → 44.1kHz",
    description: "Convert audio sample rate to 44.1kHz (CD quality).",
    sourceExtensions: [".mp3", ".wav", ".aac", ".ogg", ".flac"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "audioTo44100Hz"
  },
  {
    slug: "audio-to-48000hz",
    label: "Audio → 48kHz",
    description: "Convert audio sample rate to 48kHz (professional).",
    sourceExtensions: [".mp3", ".wav", ".aac", ".ogg", ".flac"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "audioTo48000Hz"
  },
  {
    slug: "audio-to-96000hz",
    label: "Audio → 96kHz",
    description: "Convert audio sample rate to 96kHz (high-res).",
    sourceExtensions: [".mp3", ".wav", ".aac", ".ogg", ".flac"],
    targetExtension: ".flac",
    category: "audio",
    converter: "audioTo96000Hz"
  },
  
  // Audio web optimization
  {
    slug: "optimize-audio",
    label: "Optimize Audio",
    description: "Optimize audio for web (128kbps MP3, 44.1kHz).",
    sourceExtensions: [".mp3", ".wav", ".aac", ".ogg", ".flac"],
    targetExtension: ".mp3",
    category: "audio",
    converter: "optimizeAudio"
  },
  {
    slug: "audio-to-web-aac",
    label: "Audio → Web AAC",
    description: "Optimize audio for web as AAC (iOS compatible).",
    sourceExtensions: [".mp3", ".wav", ".aac", ".ogg", ".flac"],
    targetExtension: ".aac",
    category: "audio",
    converter: "audioToWebAac"
  },
  
  // Media info (keep existing)
  {
    slug: "media-info",
    label: "Media Info",
    description: "Extract metadata from video/audio files.",
    sourceExtensions: [".mp4", ".avi", ".mkv", ".mp3", ".wav", ".flac"],
    targetExtension: ".json",
    category: "videos",
    converter: "mediaInfo"
  },
  {
    slug: "media-to-txt",
    label: "Media → TXT",
    description: "Extract media metadata to text format.",
    sourceExtensions: [".mp4", ".avi", ".mkv", ".mp3", ".wav", ".flac"],
    targetExtension: ".txt",
    category: "videos",
    converter: "mediaToTxt"
  },
  
  // Spreadsheet conversions
  {
    slug: "xlsx-to-csv",
    label: "XLSX → CSV",
    description: "Convert Excel to CSV format.",
    sourceExtensions: [".xlsx"],
    targetExtension: ".csv",
    category: "spreadsheets",
    converter: "xlsxToCsv"
  },
  {
    slug: "xlsx-to-txt",
    label: "XLSX → TXT",
    description: "Convert Excel to plain text.",
    sourceExtensions: [".xlsx"],
    targetExtension: ".txt",
    category: "spreadsheets",
    converter: "xlsxToTxt"
  },
  {
    slug: "xlsx-to-html",
    label: "XLSX → HTML",
    description: "Convert Excel to HTML table.",
    sourceExtensions: [".xlsx"],
    targetExtension: ".html",
    category: "spreadsheets",
    converter: "xlsxToHtml"
  },
  {
    slug: "xlsx-to-json",
    label: "XLSX → JSON",
    description: "Convert Excel to JSON format.",
    sourceExtensions: [".xlsx"],
    targetExtension: ".json",
    category: "spreadsheets",
    converter: "xlsxToJson"
  },
  {
    slug: "csv-to-xlsx",
    label: "CSV → XLSX",
    description: "Convert CSV to Excel format.",
    sourceExtensions: [".csv"],
    targetExtension: ".xlsx",
    category: "spreadsheets",
    converter: "csvToXlsx"
  },
  {
    slug: "csv-to-json",
    label: "CSV → JSON",
    description: "Convert CSV to JSON format.",
    sourceExtensions: [".csv"],
    targetExtension: ".json",
    category: "spreadsheets",
    converter: "csvToJson"
  },
  {
    slug: "csv-to-html",
    label: "CSV → HTML",
    description: "Convert CSV to HTML table.",
    sourceExtensions: [".csv"],
    targetExtension: ".html",
    category: "spreadsheets",
    converter: "csvToHtml"
  },
  {
    slug: "json-to-xlsx",
    label: "JSON → XLSX",
    description: "Convert JSON to Excel format.",
    sourceExtensions: [".json"],
    targetExtension: ".xlsx",
    category: "spreadsheets",
    converter: "jsonToXlsx"
  },
  {
    slug: "json-to-csv",
    label: "JSON → CSV",
    description: "Convert JSON to CSV format.",
    sourceExtensions: [".json"],
    targetExtension: ".csv",
    category: "spreadsheets",
    converter: "jsonToCsv"
  },
  
  // Archive conversions
  {
    slug: "file-to-zip",
    label: "File → ZIP",
    description: "Create a ZIP archive from any file.",
    sourceExtensions: [".txt", ".pdf", ".jpg", ".png", ".docx", ".xlsx"],
    targetExtension: ".zip",
    category: "archives",
    converter: "fileToZip"
  },
  {
    slug: "zip-to-txt",
    label: "ZIP → TXT",
    description: "List ZIP archive contents.",
    sourceExtensions: [".zip"],
    targetExtension: ".txt",
    category: "archives",
    converter: "zipToTxt"
  }
];

export function getCategoryByKey(key: ConversionCategoryKey): ConversionCategory | undefined {
  return conversionCategories.find((category) => category.key === key);
}

export function getToolsByCategory(key: ConversionCategoryKey): ConversionToolDefinition[] {
  // Filter tools by category and sort alphabetically by label
  return conversionTools
    .filter((tool) => tool.category === key)
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getToolBySlug(slug: string): ConversionToolDefinition | undefined {
  return conversionTools.find((tool) => tool.slug === slug);
}
