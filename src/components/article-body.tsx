import Link from "next/link";

export type ContentBlock =
  | { type: "h2" | "h3" | "p" | "quote"; text: string; id: string }
  | { type: "ul"; items: string[]; id: string };

export function parseContent(content: string): ContentBlock[] {
  const lines = content.split("\n").map((line) => line.trim()).filter(Boolean);
  const blocks: ContentBlock[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ type: "ul", items: listBuffer, id: `b-${blocks.length}` });
      listBuffer = [];
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
      return;
    }
    flushList();
    const id = `b-${blocks.length}`;
    if (line.startsWith("### ")) blocks.push({ type: "h3", text: line.slice(4), id });
    else if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3), id });
    else if (line.startsWith("> ")) blocks.push({ type: "quote", text: line.slice(2), id });
    else blocks.push({ type: "p", text: line, id });
  });
  flushList();
  return blocks;
}

export function getHeadings(content: string) {
  return parseContent(content)
    .filter((block) => block.type === "h2" || block.type === "h3")
    .map((block) => ({
      id: block.id,
      text: "text" in block ? block.text : "",
      level: block.type,
    }));
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className="font-semibold text-cream/90">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function ArticleBody({ content }: { content: string }) {
  const blocks = parseContent(content);
  return (
    <div className="space-y-5">
      {blocks.map((block) => {
        if (block.type === "h2") {
          return (
            <h2
              key={block.id}
              id={block.id}
              className="scroll-mt-28 pt-4 text-xl font-extrabold text-cream md:text-2xl"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={block.id} id={block.id} className="scroll-mt-28 pt-2 text-base font-bold text-goldsoft">
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={block.id} className="space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-7 text-cream/62">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={block.id}
              className="rounded-2xl border-r-2 border-gold bg-gold/[0.06] px-5 py-4 text-sm leading-7 text-cream/75"
            >
              {renderInline(block.text)}
            </blockquote>
          );
        }
        return (
          <p key={block.id} className="text-sm leading-8 text-cream/60">
            {renderInline(block.text)}
          </p>
        );
      })}
      <p className="pt-2 text-[0.68rem] leading-6 text-cream/30">
        این مطلب بخشی از ژورنال کیف‌شاپ است. برای انتخاب دقیق‌تر،{" "}
        <Link href="/size-guide" className="text-goldsoft underline decoration-gold/40">
          جدول سایزبندی
        </Link>{" "}
        و{" "}
        <Link href="/buying-guide" className="text-goldsoft underline decoration-gold/40">
          راهنمای خرید کیف
        </Link>{" "}
        را ببینید.
      </p>
    </div>
  );
}
