import { cn } from "@/lib/utils";
import { markGlyphs, wordmark } from "./logo-paths";

/** The "IR" monogram, same artwork as `public/icon.svg`. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("shrink-0", className)}>
      <rect width="64" height="64" rx="14" className="fill-primary" />
      <g fill="#fff">
        {markGlyphs.map((glyph) => (
          <path key={glyph.transform} transform={glyph.transform} d={glyph.d} />
        ))}
      </g>
    </svg>
  );
}

/** "Italy" in Plus Jakarta Sans ExtraBold Italic + "Receipt" in Regular, as outlines. */
export function LogoWordmark({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${wordmark.width} ${wordmark.height}`} aria-hidden className={cn("shrink-0", className)}>
      <path fill="currentColor" d={wordmark.italy} />
      <path className="fill-primary" d={wordmark.receipt} />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark className="size-8" />
      <LogoWordmark className="h-[1.15rem] w-auto text-foreground" />
      <span className="sr-only">ItalyReceipt</span>
    </span>
  );
}
