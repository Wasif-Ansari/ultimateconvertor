import type { ConversionJobData } from "@/lib/jobs";
import { 
  convertJpgToPng, convertJpgToWebp, convertJpgToTiff, convertJpgToAvif,
  convertPngToJpg, convertPngToWebp, convertPngToTiff, convertPngToAvif,
  convertWebpToPng, convertWebpToJpg, convertWebpToTiff,
  convertTiffToPng, convertTiffToJpg, convertTiffToWebp,
  convertAvifToPng, convertAvifToJpg, convertAvifToWebp
} from "@/lib/converters/images";
import {
  convertDocxToTxt, convertDocxToHtml,
  convertTxtToPdf, convertDocxToPdf,
  convertHtmlToTxt, convertMdToHtml, convertMdToTxt,
  // New advanced document converters
  convertDocxToOdt, convertDocxToRtf, convertDocToDocx,
  convertOdtToDocx, convertRtfToDocx,
  convertPdfToDocx, convertPdfToRtf, convertPdfToImages, convertImagesToPdf,
  convertMdToDocx, convertMdToPdf, convertMdToRtf,
  convertHtmlToPdf, convertHtmlToDocx, convertHtmlToRtf,
  convertLatexToPdf, convertLatexToDocx,
  // OCR converters
  convertImageToSearchablePdf, convertImageToTextOcr,
  convertScannedPdfToSearchable, convertPdfToTextOcr
} from "@/lib/converters/documents";
import {
  convertPdfToText, convertPdfToJson, optimizePdf,
  convertImageToPdf as convertImageToPdfOld, getPdfInfo,
  convertPdfToHtml, splitPdfPages,
  convertHtmlToPdf as convertHtmlToPdfBasic
} from "@/lib/converters/pdf";
import {
  convertXlsxToCsv, convertXlsxToTxt, convertXlsxToHtml, convertXlsxToJson,
  convertCsvToXlsx, convertCsvToJson, convertCsvToHtml,
  convertJsonToXlsx, convertJsonToCsv
} from "@/lib/converters/spreadsheets";
import {
  createZipFromFile, extractZipToFile, zipToTxt
} from "@/lib/converters/archive";
import {
  convertTxtToPptx, convertJsonToPptx, convertCsvToPptx,
  convertMdToPptx, createBlankPptx
} from "@/lib/converters/presentations";
import {
  extractMediaInfo, mediaToText, videoPlaceholder, audioPlaceholder
} from "@/lib/converters/media";
import {
  convertMp4ToMov, convertMp4ToAvi, convertMp4ToMkv, convertMp4ToWebm,
  convertMovToMp4, convertMovToMkv, convertAviToMp4, convertMkvToMp4,
  convertVideoToGif, extractMp3FromVideo, extractWavFromVideo,
  extractAacFromVideo, extractOggFromVideo, convertTo1080p,
  convertTo720p, convertTo480p, convertTo30fps, convertTo24fps,
  convertTo60fps, optimizeForWeb as optimizeVideoForWeb
} from "@/lib/converters/video";
import {
  convertMp3ToWav, convertMp3ToAac, convertMp3ToOgg, convertMp3ToFlac,
  convertWavToMp3, convertWavToAac, convertWavToOgg, convertWavToFlac,
  convertAacToMp3, convertAacToWav, convertAacToOgg, convertAacToFlac,
  convertOggToMp3, convertOggToWav, convertOggToAac, convertOggToFlac,
  convertFlacToMp3, convertFlacToWav, convertFlacToAac, convertFlacToOgg,
  convertTo128kbps, convertTo192kbps, convertTo320kbps,
  convertToMono, convertToStereo,
  convertTo44100Hz, convertTo48000Hz, convertTo96000Hz,
  optimizeForWeb as optimizeAudioForWeb, convertToWebAac
} from "@/lib/converters/audio";

export type ConverterHandler = (job: ConversionJobData) => Promise<{ outputPath: string }>;

const registry: Record<string, ConverterHandler> = {
  // Image conversions - JPG
  jpgToPng: convertJpgToPng,
  jpgToWebp: convertJpgToWebp,
  jpgToTiff: convertJpgToTiff,
  jpgToAvif: convertJpgToAvif,
  
  // Image conversions - PNG
  pngToJpg: convertPngToJpg,
  pngToWebp: convertPngToWebp,
  pngToTiff: convertPngToTiff,
  pngToAvif: convertPngToAvif,
  
  // Image conversions - WEBP
  webpToPng: convertWebpToPng,
  webpToJpg: convertWebpToJpg,
  webpToTiff: convertWebpToTiff,
  
  // Image conversions - TIFF
  tiffToPng: convertTiffToPng,
  tiffToJpg: convertTiffToJpg,
  tiffToWebp: convertTiffToWebp,
  
  // Image conversions - AVIF
  avifToPng: convertAvifToPng,
  avifToJpg: convertAvifToJpg,
  avifToWebp: convertAvifToWebp,
  
  // Document conversions
  docxToTxt: convertDocxToTxt,
  docxToHtml: convertDocxToHtml,
  txtToPdf: convertTxtToPdf,
  htmlToTxt: convertHtmlToTxt,
  mdToHtml: convertMdToHtml,
  mdToTxt: convertMdToTxt,
  
  // PDF conversions
  pdfToTxt: convertPdfToText,
  pdfToText: convertPdfToText,
  pdfToJson: convertPdfToJson,
  pdfOptimize: optimizePdf,
  // htmlToPdf: convertHtmlToPdf, // Requires Puppeteer - use htmlToPdf from documents.ts on Render
  imageToPdf: convertImageToPdfOld,
  pdfInfo: getPdfInfo,
  pdfToHtml: convertPdfToHtml,
  pdfSplit: splitPdfPages,
  
  // New advanced document/PDF conversions (working ones)
  docxToPdf: convertDocxToPdf,
  docxToOdt: convertDocxToOdt,
  docxToRtf: convertDocxToRtf,
  // docToDocx: convertDocToDocx, // Requires LibreOffice
  odtToDocx: convertOdtToDocx,
  rtfToDocx: convertRtfToDocx,
  pdfToDocx: convertPdfToDocx,
  pdfToRtf: convertPdfToRtf,
  // pdfToImages: convertPdfToImages, // Requires Poppler
  imagesToPdf: convertImagesToPdf,
  mdToDocx: convertMdToDocx,
  // mdToPdf: convertMdToPdf, // Requires Puppeteer
  mdToRtf: convertMdToRtf,
  htmlToPdf: convertHtmlToPdfBasic,
  htmlToDocx: convertHtmlToDocx,
  htmlToRtf: convertHtmlToRtf,
  // latexToPdf: convertLatexToPdf, // Requires pdflatex
  // latexToDocx: convertLatexToDocx, // Requires Pandoc
  
  // OCR conversions
  imageToSearchablePdf: convertImageToSearchablePdf,
  imageToTextOcr: convertImageToTextOcr,
  // scannedPdfToSearchable: convertScannedPdfToSearchable, // Requires Poppler
  // pdfToTextOcr: convertPdfToTextOcr, // Requires Poppler
  
  // Spreadsheet conversions
  xlsxToCsv: convertXlsxToCsv,
  xlsxToTxt: convertXlsxToTxt,
  xlsxToHtml: convertXlsxToHtml,
  xlsxToJson: convertXlsxToJson,
  csvToXlsx: convertCsvToXlsx,
  csvToJson: convertCsvToJson,
  csvToHtml: convertCsvToHtml,
  jsonToXlsx: convertJsonToXlsx,
  jsonToCsv: convertJsonToCsv,
  
  // Presentation conversions
  txtToPptx: convertTxtToPptx,
  jsonToPptx: convertJsonToPptx,
  csvToPptx: convertCsvToPptx,
  mdToPptx: convertMdToPptx,
  createPptx: createBlankPptx,
  
  // Media conversions (info extraction only)
  mediaInfo: extractMediaInfo,
  mediaToTxt: mediaToText,
  videoInfo: videoPlaceholder,
  audioInfo: audioPlaceholder,
  
  // Video format conversions
  mp4ToMov: convertMp4ToMov,
  mp4ToAvi: convertMp4ToAvi,
  mp4ToMkv: convertMp4ToMkv,
  mp4ToWebm: convertMp4ToWebm,
  movToMp4: convertMovToMp4,
  movToMkv: convertMovToMkv,
  aviToMp4: convertAviToMp4,
  mkvToMp4: convertMkvToMp4,
  videoToGif: convertVideoToGif,
  
  // Video to audio extraction
  videoToMp3: extractMp3FromVideo,
  videoToWav: extractWavFromVideo,
  videoToAac: extractAacFromVideo,
  videoToOgg: extractOggFromVideo,
  
  // Video quality/resolution
  videoTo1080p: convertTo1080p,
  videoTo720p: convertTo720p,
  videoTo480p: convertTo480p,
  
  // Video frame rate
  videoTo30fps: convertTo30fps,
  videoTo24fps: convertTo24fps,
  videoTo60fps: convertTo60fps,
  optimizeVideo: optimizeVideoForWeb,
  
  // Audio format conversions - MP3
  mp3ToWav: convertMp3ToWav,
  mp3ToAac: convertMp3ToAac,
  mp3ToOgg: convertMp3ToOgg,
  mp3ToFlac: convertMp3ToFlac,
  
  // Audio format conversions - WAV
  wavToMp3: convertWavToMp3,
  wavToAac: convertWavToAac,
  wavToOgg: convertWavToOgg,
  wavToFlac: convertWavToFlac,
  
  // Audio format conversions - AAC
  aacToMp3: convertAacToMp3,
  aacToWav: convertAacToWav,
  aacToOgg: convertAacToOgg,
  aacToFlac: convertAacToFlac,
  
  // Audio format conversions - OGG
  oggToMp3: convertOggToMp3,
  oggToWav: convertOggToWav,
  oggToAac: convertOggToAac,
  oggToFlac: convertOggToFlac,
  
  // Audio format conversions - FLAC
  flacToMp3: convertFlacToMp3,
  flacToWav: convertFlacToWav,
  flacToAac: convertFlacToAac,
  flacToOgg: convertFlacToOgg,
  
  // Audio quality/bitrate
  audioTo128k: convertTo128kbps,
  audioTo192k: convertTo192kbps,
  audioTo320k: convertTo320kbps,
  
  // Audio channels
  audioToMono: convertToMono,
  audioToStereo: convertToStereo,
  
  // Audio sample rate
  audioTo44100Hz: convertTo44100Hz,
  audioTo48000Hz: convertTo48000Hz,
  audioTo96000Hz: convertTo96000Hz,
  
  // Audio web optimization
  optimizeAudio: optimizeAudioForWeb,
  audioToWebAac: convertToWebAac,
  
  // Archive conversions
  fileToZip: createZipFromFile,
  zipToFile: extractZipToFile,
  zipToTxt: zipToTxt
};

export function getConverter(name: string): ConverterHandler {
  const handler = registry[name];
  if (!handler) {
    throw new Error(`No converter registered for ${name}`);
  }
  return handler;
}

export function listConverters() {
  return Object.keys(registry);
}
