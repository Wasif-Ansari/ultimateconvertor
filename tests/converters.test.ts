import { describe, expect, it } from "vitest";
import { conversionTools } from "@/lib/tools";
import { getConverter } from "@/lib/converters";

describe("converter registry", () => {
  it("provides a handler for every tool", () => {
    const missing = conversionTools.filter((tool) => {
      try {
        return typeof getConverter(tool.converter) !== "function";
      } catch (error) {
        return true;
      }
    });

    expect(missing, "Every tool should resolve to a converter handler").toEqual([]);
  });
});
