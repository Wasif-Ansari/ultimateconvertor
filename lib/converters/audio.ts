import path from "path";
import ffmpeg from "fluent-ffmpeg";
import type { ConversionJobData } from "@/lib/jobs";

// Helper function to run FFmpeg commands
function runFFmpeg(
  sourcePath: string,
  targetPath: string,
  configCallback: (command: ffmpeg.FfmpegCommand) => ffmpeg.FfmpegCommand
): Promise<{ outputPath: string }> {
  return new Promise((resolve, reject) => {
    const command = ffmpeg(sourcePath);
    
    configCallback(command)
      .output(targetPath)
      .on('end', () => resolve({ outputPath: targetPath }))
      .on('error', (err) => reject(new Error(`FFmpeg error: ${err.message}`)))
      .run();
  });
}

// ============================================================================
// AUDIO FORMAT CONVERSIONS
// ============================================================================

// MP3 conversions
export async function convertMp3ToWav(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('pcm_s16le').audioFrequency(44100)
  );
}

export async function convertMp3ToAac(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('aac').audioBitrate('192k')
  );
}

export async function convertMp3ToOgg(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libvorbis').audioBitrate('192k')
  );
}

export async function convertMp3ToFlac(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('flac')
  );
}

// WAV conversions
export async function convertWavToMp3(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libmp3lame').audioBitrate('320k')
  );
}

export async function convertWavToAac(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('aac').audioBitrate('256k')
  );
}

export async function convertWavToOgg(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libvorbis').audioBitrate('256k')
  );
}

export async function convertWavToFlac(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('flac')
  );
}

// AAC conversions
export async function convertAacToMp3(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libmp3lame').audioBitrate('320k')
  );
}

export async function convertAacToWav(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('pcm_s16le')
  );
}

export async function convertAacToOgg(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libvorbis').audioBitrate('256k')
  );
}

export async function convertAacToFlac(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('flac')
  );
}

// OGG conversions
export async function convertOggToMp3(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libmp3lame').audioBitrate('320k')
  );
}

export async function convertOggToWav(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('pcm_s16le')
  );
}

export async function convertOggToAac(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('aac').audioBitrate('256k')
  );
}

export async function convertOggToFlac(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('flac')
  );
}

// FLAC conversions
export async function convertFlacToMp3(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libmp3lame').audioBitrate('320k')
  );
}

export async function convertFlacToWav(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('pcm_s16le')
  );
}

export async function convertFlacToAac(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('aac').audioBitrate('256k')
  );
}

export async function convertFlacToOgg(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libvorbis').audioBitrate('256k')
  );
}

// ============================================================================
// AUDIO QUALITY/BITRATE CONVERSIONS
// ============================================================================

export async function convertTo128kbps(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libmp3lame').audioBitrate('128k')
  );
}

export async function convertTo192kbps(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libmp3lame').audioBitrate('192k')
  );
}

export async function convertTo320kbps(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libmp3lame').audioBitrate('320k')
  );
}

// ============================================================================
// AUDIO CHANNEL CONVERSIONS
// ============================================================================

export async function convertToMono(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioChannels(1).audioCodec('libmp3lame').audioBitrate('192k')
  );
}

export async function convertToStereo(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioChannels(2).audioCodec('libmp3lame').audioBitrate('192k')
  );
}

// ============================================================================
// SAMPLE RATE CONVERSIONS
// ============================================================================

export async function convertTo44100Hz(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioFrequency(44100).audioCodec('libmp3lame').audioBitrate('192k')
  );
}

export async function convertTo48000Hz(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioFrequency(48000).audioCodec('libmp3lame').audioBitrate('192k')
  );
}

export async function convertTo96000Hz(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioFrequency(96000).audioCodec('flac')
  );
}

// ============================================================================
// WEB OPTIMIZATION
// ============================================================================

export async function optimizeForWeb(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('libmp3lame').audioBitrate('128k').audioFrequency(44100)
  );
}

export async function convertToWebAac(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.audioCodec('aac').audioBitrate('128k')
  );
}
