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
    <article className="flex h-full flex-col rounded-2xl sm:rounded-3xl bg-gradient-to-br p-[1px] shadow-glow from-indigo-600/80 to-indigo-300/20">
      <div className="flex h-full flex-col gap-4 sm:gap-6 rounded-2xl sm:rounded-3xl bg-indigo-950/90 p-4 sm:p-6">
        <div>
          <div
            className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r ${category.accentColor} px-3 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold text-indigo-950`}
          >
            {category.title}
          </div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-indigo-100/80">{category.description}</p>
        </div>
        <ul className="flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm text-indigo-200/90">
          {tools.slice(0, 3).map((tool) => (
            <li key={tool.slug} className="flex items-center justify-between gap-2">
              <span className="truncate">{tool.label}</span>
              <span className="text-indigo-300/70 whitespace-nowrap text-xs sm:text-sm">→ {tool.targetExtension.toUpperCase()}</span>
            </li>
          ))}
          {tools.length > 3 && <li className="text-indigo-200/70 text-xs sm:text-sm">+ {tools.length - 3} more tools</li>}
        </ul>
        <div className="mt-auto flex justify-between">
          <Link
            href={`/category/${category.key}`}
            className="group rounded-full bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-indigo-700 hover:text-white hover:bg-indigo-700 shadow-lg shadow-indigo-900/30 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/40 hover:scale-105 transform"
          >
            <span className="inline-flex items-center gap-1.5 sm:gap-2">
              <span className="whitespace-nowrap">Explore tools</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};
