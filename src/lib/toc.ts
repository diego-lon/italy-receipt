import GithubSlugger from "github-slugger";

export interface TocEntry {
  id: string;
  text: string;
}

/** Plain text of an inline-markdown heading, as rehype-slug sees it after rendering. */
function plainText(markdown: string) {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/(\*\*|\*)(.+?)\1/g, "$2")
    .replace(/<[^>]+>/g, "")
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, "$1")
    .trim();
}

/**
 * `##` headings of an MDX document with the ids rehype-slug gives them.
 * Every heading level goes through the same slugger so duplicate suffixes (`-1`, `-2`) match.
 */
export function extractToc(source: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const toc: TocEntry[] = [];
  let fence: string | null = null;

  for (const line of source.split(/\r?\n/)) {
    const fenceMatch = /^\s*(`{3,}|~{3,})/.exec(line);
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1][0];
      else if (fenceMatch[1][0] === fence) fence = null;
      continue;
    }
    if (fence) continue;

    const heading = /^(#{1,6})\s+(.+?)(?:\s+#+)?\s*$/.exec(line);
    if (!heading) continue;
    const text = plainText(heading[2]);
    const id = slugger.slug(text);
    if (heading[1].length === 2) toc.push({ id, text });
  }
  return toc;
}
