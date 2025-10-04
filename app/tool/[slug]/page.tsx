import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolUpload } from "@/components/tool-upload";
import { conversionTools, getToolBySlug } from "@/lib/tools";

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return conversionTools.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    return {};
  }

  return {
    title: `${tool.label} | Ultimate File Converter`,
    description: tool.description
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-10 px-6 py-24">
      <Link href={`/category/${tool.category}`} className="text-sm text-indigo-200/70 hover:text-white">
        ← Back to {tool.category} tools
      </Link>
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-900/40 px-4 py-1 text-xs uppercase tracking-[0.4em] text-indigo-200/70">
          {tool.label}
        </div>
        <h1 className="text-4xl font-semibold text-white">{tool.label}</h1>
        <p className="text-indigo-100/80">{tool.description}</p>
        <p className="font-mono text-xs text-indigo-200/70">
          {tool.sourceExtensions.join(", ")} → {tool.targetExtension}
        </p>
      </header>
      <ToolUpload tool={tool} />
    </main>
  );
}
