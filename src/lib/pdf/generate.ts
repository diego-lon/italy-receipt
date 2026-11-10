import { createElement, type ReactElement } from "react";
import type { DocumentProps } from "@react-pdf/renderer";
import type { ReceiptPdfData } from "../receipt";
import { pdfStrings, splitPdfLanguage } from "./strings";

type PdfModules = [typeof import("@react-pdf/renderer"), typeof import("@/components/pdf/receipt-document")];

let modules: Promise<PdfModules> | null = null;

/** Loads the PDF library (~1 MB) on demand; safe to call repeatedly to warm it up ahead of time. */
export function preloadPdfRenderer() {
  if (!modules) {
    modules = Promise.all([import("@react-pdf/renderer"), import("@/components/pdf/receipt-document")]);
    modules.catch(() => {
      modules = null;
    });
  }
  return modules;
}

/** Renders the receipt in the browser. */
export async function renderReceiptPdf(data: ReceiptPdfData): Promise<Blob> {
  const [{ pdf }, { ReceiptDocument, registerPdfFonts }] = await preloadPdfRenderer();
  registerPdfFonts(`${window.location.origin}/fonts`);
  const element = createElement(ReceiptDocument, { data }) as unknown as ReactElement<DocumentProps>;
  return pdf(element).toBlob();
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

export function receiptFileName(data: Pick<ReceiptPdfData, "language" | "number" | "provider">) {
  const [primary] = splitPdfLanguage(data.language);
  const base = slugify([pdfStrings[primary].fileName, data.number, data.provider.name].filter(Boolean).join(" "));
  return `${base || pdfStrings[primary].fileName}.pdf`;
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/**
 * Opens the PDF in a new tab. The tab must be opened synchronously inside the click handler
 * (before the async rendering) or popup blockers will stop it, hence the two steps.
 */
export function openPreviewWindow(message: string) {
  const target = window.open("", "_blank");
  if (target) {
    target.document.title = message;
    const body = target.document.body;
    body.style.cssText = "margin:0;display:grid;place-items:center;min-height:100vh;font:16px system-ui,sans-serif;color:#64748b";
    body.textContent = message;
  }
  return target;
}

export function showBlobInWindow(target: Window, blob: Blob) {
  const url = URL.createObjectURL(blob);
  target.location.href = url;
  setTimeout(() => URL.revokeObjectURL(url), 5 * 60_000);
}
