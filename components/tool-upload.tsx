"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudArrowUpIcon, ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import type { ConversionJobResponse, ConversionToolDefinition } from "@/lib/types";
import { ProgressBar } from "@/components/progress-bar";

interface ToolUploadProps {
  tool: ConversionToolDefinition;
}

type UploadState = "idle" | "ready" | "uploading" | "queued" | "processing" | "completed" | "failed";

export function ToolUpload({ tool }: ToolUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const accepts = useMemo(() => tool.sourceExtensions.join(","), [tool.sourceExtensions]);

  const clearPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearPolling();
  }, [clearPolling]);

  const handleFile = useCallback((fileList: FileList | null) => {
    if (!fileList?.[0]) return;
    const selected = fileList[0];
    setFile(selected);
    setState("ready");
    setError(null);
    setProgress(0);
    setJobId(null);
    setDownloadUrl(null);
  }, []);

  const handleDrop = useCallback(
  (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      handleFile(event.dataTransfer.files);
    },
    [handleFile]
  );

  const handleSubmit = useCallback(async () => {
    if (!file) return;
    try {
      setState("uploading");
      setProgress(10);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("toolSlug", tool.slug);

      const response = await fetch("/api/jobs", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        const message = errorPayload?.error ?? "Failed to create conversion job";
        throw new Error(message);
      }

      const data = (await response.json()) as ConversionJobResponse;
      setJobId(data.jobId);
      
      // For synchronous processing, check if conversion is already complete
      if (data.status === "completed") {
        setState("completed");
        setProgress(100);
        setDownloadUrl(data.downloadUrl ?? `/api/jobs/${data.jobId}/download`);
      } else if (data.status === "failed") {
        setState("failed");
        setError(data.error ?? "Conversion failed");
      } else {
        // If still processing, poll for status
        setState("processing");
        setProgress(50);

        clearPolling();
        pollIntervalRef.current = setInterval(async () => {
          if (!data.jobId) return;
          try {
            const statusResponse = await fetch(`/api/jobs/${data.jobId}`);
            if (!statusResponse.ok) {
              throw new Error("Failed to poll job status");
            }
            const statusData = (await statusResponse.json()) as ConversionJobResponse;
            if (statusData.status === "processing") {
              setState("processing");
              setProgress((current) => Math.max(current, 70));
            }
            if (statusData.status === "completed") {
              setState("completed");
              setProgress(100);
              setDownloadUrl(statusData.downloadUrl ?? `/api/jobs/${data.jobId}/download`);
              clearPolling();
            }
            if (statusData.status === "failed") {
              setState("failed");
              setError(statusData.error ?? "Conversion failed");
              clearPolling();
            }
          } catch (pollError) {
            console.error(pollError);
            setState("failed");
            setError((pollError as Error).message);
            clearPolling();
          }
        }, 2000);
      }
    } catch (err) {
      setState("failed");
      setError((err as Error).message);
    }
  }, [clearPolling, file, tool.slug]);

  const reset = useCallback(() => {
    setFile(null);
    setState("idle");
    setProgress(0);
    setJobId(null);
    setDownloadUrl(null);
    setError(null);
    clearPolling();
  }, [clearPolling]);

  const statusLabel = useMemo(() => {
    switch (state) {
      case "uploading":
        return "Uploading";
      case "queued":
        return "Queued";
      case "processing":
        return "Processing";
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      default:
        return undefined;
    }
  }, [state]);

  return (
    <div className="space-y-8">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onDrop={handleDrop}
        className="group relative rounded-3xl border border-dashed border-indigo-500/50 bg-indigo-900/30 p-10 transition hover:border-indigo-300/60"
      >
        <input
          type="file"
          accept={accepts}
          onChange={(event) => handleFile(event.target.files)}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <div className="pointer-events-none flex flex-col items-center gap-4 text-center text-indigo-100/80">
          <CloudArrowUpIcon className="h-12 w-12 text-indigo-200/80 transition group-hover:text-white" />
          <div>
            <p className="text-lg font-semibold text-white">Drag & drop your file</p>
            <p className="text-sm text-indigo-200/70">or click to browse your device</p>
          </div>
          <p className="rounded-full border border-indigo-400/40 px-4 py-1 text-xs uppercase tracking-[0.4em] text-indigo-200/70">
            Accepted: {tool.sourceExtensions.join(", ")}
          </p>
        </div>
      </div>

      <AnimatePresence>{file && <SelectedFile file={file} onReset={reset} />}</AnimatePresence>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-indigo-200/70">
          <p className="font-semibold text-indigo-100">Output format</p>
          <p>{tool.targetExtension.toUpperCase()}</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            disabled={state === "uploading" || state === "processing"}
            className="rounded-full border border-indigo-400/40 px-5 py-2 text-sm font-semibold text-indigo-200 transition hover:border-indigo-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!file || state === "uploading" || state === "processing"}
            className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-900/40 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {state === "uploading" || state === "processing" ? "Converting…" : "Start conversion"}
          </button>
        </div>
      </div>

      {(state === "uploading" || state === "processing" || state === "queued" || state === "completed" || state === "failed") && (
        <div className="rounded-3xl border border-indigo-500/20 bg-indigo-900/30 p-6">
          <ProgressBar progress={progress} statusLabel={statusLabel} />
          {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
          {state === "completed" && downloadUrl && (
            <a
              href={downloadUrl}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow-md shadow-indigo-900/40 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ArrowDownCircleIcon className="h-5 w-5" />
              Download converted file
            </a>
          )}
        </div>
      )}

      {jobId && state !== "completed" && state !== "failed" && (
        <p className="text-xs text-indigo-200/60">
          Job ID: <span className="font-mono text-indigo-100">{jobId}</span>
        </p>
      )}
    </div>
  );
}

interface SelectedFileProps {
  file: File;
  onReset: () => void;
}

function SelectedFile({ file, onReset }: SelectedFileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="flex items-center justify-between rounded-3xl border border-indigo-500/30 bg-indigo-900/40 px-6 py-4"
    >
      <div>
        <p className="text-sm font-semibold text-indigo-100">{file.name}</p>
        <p className="text-xs text-indigo-200/60">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="text-sm font-semibold text-indigo-200 transition hover:text-white"
      >
        Remove
      </button>
    </motion.div>
  );
}
