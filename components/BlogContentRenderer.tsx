import React from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { BlogContentBlock } from "@/lib/blog";

interface BlogContentRendererProps {
  content: string;
  blocks?: BlogContentBlock[];
  postTitle?: string;
}

/**
 * Safely parse inline Markdown (**bold** and [text](url)) into React nodes without dangerouslySetInnerHTML
 */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={idx} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal =
        href.startsWith("/") ||
        href.includes("ketoanthuesocson.com.vn") ||
        href.includes("dichvuketoanthuesocson.com.vn");

      if (href.startsWith("/")) {
        return (
          <Link
            key={idx}
            href={href}
            className="font-bold text-[#D7181F] underline decoration-red-300 underline-offset-4 hover:text-red-800 transition-colors"
          >
            {label}
          </Link>
        );
      }

      return (
        <a
          key={idx}
          href={href}
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          className="font-bold text-[#D7181F] underline decoration-red-300 underline-offset-4 hover:text-red-800 transition-colors"
        >
          {label}
        </a>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

/**
 * Parse raw Markdown string into structured BlogContentBlock[] for unified rendering
 */
function parseMarkdownToBlocks(markdown: string, postTitle?: string): BlogContentBlock[] {
  if (!markdown) return [];

  // Remove HTML comments (e.g. <!-- TODO: ... -->)
  const cleanMd = markdown.replace(/<!--[\s\S]*?-->/g, "").trim();
  const lines = cleanMd.split(/\r?\n/);

  const blocks: BlogContentBlock[] = [];
  let listBuffer: string[] = [];
  let paragraphBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: "list", items: [...listBuffer] });
      listBuffer = [];
    }
  };

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      blocks.push({ type: "paragraph", text: paragraphBuffer.join(" ").trim() });
      paragraphBuffer = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      flushParagraph();
      continue;
    }

    // Skip top-level # H1 if page already renders postTitle as <h1>
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      flushList();
      flushParagraph();
      const h1Text = line.replace(/^#\s+/, "").trim();
      if (
        postTitle &&
        h1Text.toLowerCase() === postTitle.trim().toLowerCase()
      ) {
        continue;
      }
      continue;
    }

    if (line.startsWith("## ") && !line.startsWith("### ")) {
      flushList();
      flushParagraph();
      blocks.push({
        type: "heading",
        text: line.replace(/^##\s+/, "").trim(),
      });
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      flushParagraph();
      blocks.push({
        type: "subheading",
        text: line.replace(/^###+\s+/, "").trim(),
      });
      continue;
    }

    if (line.startsWith(">")) {
      flushList();
      flushParagraph();
      const alertText = line
        .replace(/^>\s*/, "")
        .replace(/^\*\*Lưu ý( quan trọng)?:\*\*\s*/i, "")
        .trim();
      if (alertText) {
        blocks.push({ type: "alert", text: alertText });
      }
      continue;
    }

    if (/^([-*•]|\d+[\.\)])\s+/.test(line)) {
      flushParagraph();
      listBuffer.push(line.replace(/^([-*•]|\d+[\.\)])\s+/, "").trim());
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  flushList();
  flushParagraph();

  return blocks;
}

export const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({
  content,
  blocks,
  postTitle,
}) => {
  const normalizedBlocks =
    Array.isArray(blocks) && blocks.length > 0
      ? blocks
      : parseMarkdownToBlocks(content, postTitle);

  return (
    <article className="space-y-5 text-slate-700 text-base sm:text-[17px] leading-relaxed">
      {normalizedBlocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const cleanHeading = (block.text || "")
              .replace(/^H2:\s*/i, "")
              .trim();
            return (
              <h2
                key={index}
                className="text-xl sm:text-2xl font-extrabold text-[#04266F] pt-6 pb-1 border-l-4 border-[#D7181F] pl-3.5 tracking-tight"
              >
                {cleanHeading}
              </h2>
            );
          }

          case "subheading": {
            const cleanSubheading = (block.text || "")
              .replace(/^H3:\s*/i, "")
              .trim();
            return (
              <h3
                key={index}
                className="text-lg sm:text-xl font-bold text-slate-900 pt-3"
              >
                {renderInlineMarkdown(cleanSubheading)}
              </h3>
            );
          }

          case "list": {
            if (!Array.isArray(block.items) || block.items.length === 0) {
              return null;
            }
            return (
              <ul
                key={index}
                className="space-y-2.5 bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5"
              >
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#D7181F] shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      {renderInlineMarkdown(String(item))}
                    </span>
                  </li>
                ))}
              </ul>
            );
          }

          case "alert": {
            return (
              <div
                key={index}
                className="rounded-xl border border-amber-300 bg-amber-50/80 p-4 sm:p-5 flex items-start gap-3 text-slate-800 shadow-xs"
              >
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm sm:text-base leading-relaxed">
                  <span className="font-extrabold text-amber-900 mr-1.5">
                    Lưu ý chuyên gia:
                  </span>
                  {renderInlineMarkdown(block.text || "")}
                </div>
              </div>
            );
          }

          case "paragraph":
          default: {
            if (!block.text) return null;
            return (
              <p key={index} className="text-slate-700 leading-relaxed">
                {renderInlineMarkdown(block.text)}
              </p>
            );
          }
        }
      })}
    </article>
  );
};
