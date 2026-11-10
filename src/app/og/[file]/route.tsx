import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { markGlyphs, wordmark } from "@/components/site/logo-paths";
import { loadGuide } from "@/lib/content";
import { getDictionary, interpolate } from "@/lib/i18n";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { ogImageFile } from "@/lib/metadata";
import { guideIds, type GuideId, type PageKey } from "@/lib/routes";

export const dynamic = "force-static";
export const dynamicParams = false;

const blue = "#2563eb";
const ink = "#0f172a";
const muted = "#475569";

type OgPage = Exclude<PageKey, { type: "privacy" }>;

function ogPages(): Array<{ locale: Locale; page: OgPage }> {
  return locales.flatMap((locale) => [
    { locale, page: { type: "home" as const } },
    { locale, page: { type: "guides" as const } },
    ...guideIds.map((id) => ({ locale, page: { type: "guide" as const, id } })),
  ]);
}

export function generateStaticParams() {
  return ogPages().map(({ locale, page }) => ({ file: ogImageFile(locale, page) }));
}

function parseFile(file: string): { locale: Locale; page: OgPage } | null {
  const match = /^([a-z]{2})-(.+)\.png$/.exec(file);
  if (!match || !isLocale(match[1])) return null;
  const [, locale, key] = match;
  if (key === "home") return { locale, page: { type: "home" } };
  if (key === "guides") return { locale, page: { type: "guides" } };
  return (guideIds as readonly string[]).includes(key) ? { locale, page: { type: "guide", id: key as GuideId } } : null;
}

let fontsPromise: Promise<Array<{ name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" }>> | undefined;

function loadFonts() {
  fontsPromise ??= Promise.all(
    ([
      ["Regular", 400],
      ["SemiBold", 600],
      ["Bold", 700],
    ] as const).map(async ([file, weight]) => ({
      name: "Jakarta",
      data: await readFile(path.join(process.cwd(), "public", "fonts", `PlusJakartaSans-${file}.ttf`)),
      weight,
      style: "normal" as const,
    })),
  );
  return fontsPromise;
}

/** The bundled font has no narrow no-break space (French typography), so use a regular one. */
const clean = (text: string) => text.replace(/\u202f/g, "\u00a0");

async function content(locale: Locale, page: OgPage) {
  const dict = getDictionary(locale);
  if (page.type === "home") {
    // `*emphasis*` parts become their own blue lines.
    const lines = dict.hero.title
      .split(/\*([^*]+)\*/)
      .map((text, index) => ({ text: text.trim(), accent: index % 2 === 1 }))
      .filter((line) => line.text);
    return { kicker: dict.hero.badge, lines, footer: dict.hero.trust.join("  ·  ") };
  }
  if (page.type === "guides") {
    return {
      kicker: dict.nav.guides,
      lines: [{ text: dict.guidesIndex.title, accent: false }],
      footer: dict.guidesIndex.subtitle,
    };
  }
  const { meta } = await loadGuide(page.id, locale);
  return {
    kicker: meta.readingMinutes
      ? `${dict.nav.guides}  ·  ${interpolate(dict.guidePage.minRead, { min: meta.readingMinutes })}`
      : dict.nav.guides,
    lines: [{ text: meta.title, accent: false }],
    footer: dict.footer.tagline,
  };
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const parsed = parseFile((await params).file);
  if (!parsed) return new Response("Not found", { status: 404 });

  const { kicker, lines, footer } = await content(parsed.locale, parsed.page);
  const titleLength = lines.reduce((total, line) => total + line.text.length, 0);
  const titleSize = titleLength > 60 ? 58 : titleLength > 40 ? 66 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "Jakarta",
          color: ink,
          backgroundColor: "#f8fafc",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(37,99,235,0.20) 0%, rgba(37,99,235,0) 55%), radial-gradient(circle at 0% 100%, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0) 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="68" height="68" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill={blue} />
            <g fill="#fff">
              {markGlyphs.map((glyph) => (
                <path key={glyph.transform} transform={glyph.transform} d={glyph.d} />
              ))}
            </g>
          </svg>
          <svg width={(wordmark.width * 40) / wordmark.height} height="40" viewBox={`0 0 ${wordmark.width} ${wordmark.height}`}>
            <path fill={ink} d={wordmark.italy} />
            <path fill={blue} d={wordmark.receipt} />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              backgroundColor: "rgba(37,99,235,0.10)",
              color: blue,
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            {clean(kicker)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28, maxWidth: 1000 }}>
            {lines.map((line) => (
              <div
                key={line.text}
                style={{
                  fontSize: titleSize,
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: -1.5,
                  color: line.accent ? blue : ink,
                }}
              >
                {clean(line.text)}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e2e8f0",
            paddingTop: 28,
            fontSize: 26,
            color: muted,
          }}
        >
          <div style={{ display: "flex", maxWidth: 820 }}>{clean(footer)}</div>
          <div style={{ display: "flex", fontWeight: 600, color: ink }}>italyreceipt.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await loadFonts() },
  );
}
