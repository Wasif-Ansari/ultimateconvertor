import Link from "next/link";
import type { FC } from "react";
import type { ConversionCategory } from "@/lib/types";
import { getToolsByCategory } from "@/lib/tools";

interface CategoryCardProps {
  category: ConversionCategory;
}

export const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  const tools = getToolsByCategory(category.key);
  return (
    <article className="flex h-full flex-col rounded-3xl bg-gradient-to-br p-[1px] shadow-glow from-indigo-600/80 to-indigo-300/20">
      <div className="flex h-full flex-col gap-6 rounded-3xl bg-indigo-950/90 p-6">
        <div>
          <div
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${category.accentColor} px-4 py-1 text-sm font-semibold text-indigo-950`}
          >
            {category.title}
          </div>
          <p className="mt-4 text-indigo-100/80">{category.description}</p>
        </div>
        <ul className="flex flex-col gap-3 text-sm text-indigo-200/90">
          {tools.slice(0, 3).map((tool) => (
            <li key={tool.slug} className="flex items-center justify-between">
              <span>{tool.label}</span>
              <span className="text-indigo-300/70">→ {tool.targetExtension.toUpperCase()}</span>
            </li>
          ))}
          {tools.length > 3 && <li className="text-indigo-200/70">+ {tools.length - 3} more tools</li>}
        </ul>
        <div className="mt-auto flex justify-between">
          <Link
            href={`/category/${category.key}`}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-900/30 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Explore tools
          </Link>
        </div>
      </div>
    </article>
  );
};
