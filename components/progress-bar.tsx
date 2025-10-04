interface ProgressBarProps {
  progress: number;
  statusLabel?: string;
}

export function ProgressBar({ progress, statusLabel }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Number.isFinite(progress) ? progress : 0));

  return (
    <div className="space-y-2">
      <div className="h-2 w-full rounded-full bg-indigo-800/60">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-200"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {statusLabel && <p className="text-xs uppercase tracking-[0.3em] text-indigo-200/70">{statusLabel}</p>}
    </div>
  );
}
