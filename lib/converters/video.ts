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
// VIDEO FORMAT CONVERSIONS
// ============================================================================

export async function convertMp4ToMov(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.videoCodec('libx264').audioCodec('aac')
  );
}

export async function convertMp4ToAvi(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.videoCodec('mpeg4').audioCodec('libmp3lame')
  );
}

export async function convertMp4ToMkv(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.videoCodec('copy').audioCodec('copy')
  );
}

export async function convertMp4ToWebm(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.videoCodec('libvpx-vp9').audioCodec('libopus').videoBitrate('1000k')
  );
}

export async function convertMovToMp4(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.videoCodec('libx264').audioCodec('aac')
  );
}

export async function convertMovToMkv(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.videoCodec('copy').audioCodec('copy')
  );
}

export async function convertAviToMp4(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.videoCodec('libx264').audioCodec('aac')
  );
}

export async function convertMkvToMp4(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.videoCodec('libx264').audioCodec('aac')
  );
}

export async function convertVideoToGif(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.fps(10).size('480x?').duration(5) // 5 second clips, 10fps
  );
}

// ============================================================================
// VIDEO TO AUDIO EXTRACTION
// ============================================================================

export async function extractMp3FromVideo(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.noVideo().audioCodec('libmp3lame').audioBitrate('192k')
  );
}

export async function extractWavFromVideo(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.noVideo().audioCodec('pcm_s16le')
  );
}

export async function extractAacFromVideo(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.noVideo().audioCodec('aac').audioBitrate('192k')
  );
}

export async function extractOggFromVideo(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.noVideo().audioCodec('libvorbis').audioBitrate('192k')
  );
}

// ============================================================================
// VIDEO RESOLUTION/QUALITY CONVERSIONS
// ============================================================================

export async function convertTo1080p(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.size('1920x1080').videoCodec('libx264').audioCodec('aac').videoBitrate('5000k')
  );
}

export async function convertTo720p(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.size('1280x720').videoCodec('libx264').audioCodec('aac').videoBitrate('2500k')
  );
}

export async function convertTo480p(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.size('854x480').videoCodec('libx264').audioCodec('aac').videoBitrate('1000k')
  );
}

// ============================================================================
// VIDEO FRAME RATE CONVERSIONS
// ============================================================================

export async function convertTo30fps(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.fps(30).videoCodec('libx264').audioCodec('aac')
  );
}

export async function convertTo24fps(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.fps(24).videoCodec('libx264').audioCodec('aac')
  );
}

export async function convertTo60fps(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd.fps(60).videoCodec('libx264').audioCodec('aac')
  );
}

// ============================================================================
// WEB OPTIMIZATION
// ============================================================================

export async function optimizeForWeb(job: ConversionJobData) {
  const targetPath = path.join(path.dirname(job.sourcePath), job.targetFilename);
  return runFFmpeg(job.sourcePath, targetPath, (cmd) => 
    cmd
      .videoCodec('libx264')
      .audioCodec('aac')
      .size('1280x720')
      .videoBitrate('1500k')
      .audioBitrate('128k')
      .outputOptions(['-movflags', '+faststart']) // Enable progressive streaming
  );
}
