import { describe, expect, it } from "vitest";
import { deriveTargetFilename } from "@/lib/jobs";

describe("deriveTargetFilename", () => {
  it("replaces existing extension", () => {
    expect(deriveTargetFilename("document.docx", ".pdf")).toBe("document.pdf");
  });

  it("adds leading dot when missing", () => {
    expect(deriveTargetFilename("sheet", "csv")).toBe("sheet.csv");
  });

  it("handles multi-dot filenames", () => {
    expect(deriveTargetFilename("archive.tar.gz", ".zip")).toBe("archive.tar.zip");
  });
});
