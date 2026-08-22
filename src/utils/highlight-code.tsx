import type { ReactNode } from "react";

type CodeTokenTone = "comment" | "string" | "keyword" | "number" | "tag" | "plain";

const CODE_TOKEN_CLASS: Record<CodeTokenTone, string> = {
  comment: "text-slate-500 italic dark:text-slate-400",
  string: "text-emerald-700 dark:text-emerald-300",
  keyword: "text-violet-700 dark:text-violet-300",
  number: "text-amber-700 dark:text-amber-300",
  tag: "text-sky-700 dark:text-sky-300",
  plain: "text-slate-800 dark:text-slate-200",
};

const CODE_TOKEN_PATTERN =
  /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|<!--[\s\S]*?-->|(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|<\/?[A-Za-z][^>]*>|\b(?:abstract|as|async|await|break|case|catch|class|const|continue|def|default|delete|do|else|enum|export|extends|false|finally|for|from|function|if|import|in|interface|let|new|null|private|protected|public|return|static|switch|this|throw|true|try|type|undefined|var|void|while|with|yield)\b|\b\d+(?:\.\d+)?\b)/g;

function codeTokenTone(token: string): CodeTokenTone {
  if (token.startsWith("//") || token.startsWith("/*") || token.startsWith("<!--"))
    return "comment";
  if (token.startsWith('"') || token.startsWith("'") || token.startsWith("`"))
    return "string";
  if (token.startsWith("<")) return "tag";
  if (/^\d/.test(token)) return "number";
  return "keyword";
}

/**
 * Lightweight, dependency-free syntax highlighter for short code snippets
 * (drag-and-drop blocks, inline fill-in-blank code, lesson code blocks).
 * Not a full tokenizer — good enough for readability, not for a real editor.
 */
export function highlightCode(code: string): ReactNode[] {
  const tokens: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of code.matchAll(CODE_TOKEN_PATTERN)) {
    const token = match[0];
    const index = match.index ?? 0;
    if (index > lastIndex) tokens.push(code.slice(lastIndex, index));
    const tone = codeTokenTone(token);
    tokens.push(
      <span key={`${index}-${token}`} className={CODE_TOKEN_CLASS[tone]}>
        {token}
      </span>,
    );
    lastIndex = index + token.length;
  }

  if (lastIndex < code.length) tokens.push(code.slice(lastIndex));
  return tokens.length ? tokens : [code];
}
