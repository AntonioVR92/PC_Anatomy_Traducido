"use client";

// ModelCredits.tsx: Shows a small "Model credit" box that thanks the
// source of the 3D model, and turns any web links in the credit into
// clickable links.

import { Award } from "lucide-react";

// Finds web links (starting with http:// or https://) inside the credit text.
const URL_PATTERN = /https?:\/\/[^\s)]+/g;

// Splits the credit text into normal text and clickable links.
function renderCredit(credit: string) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(URL_PATTERN.source, "g");
  let key = 0;
  // Loop over every link found in the credit text.
  while ((match = regex.exec(credit)) !== null) {
    // Add the plain text that comes before this link.
    if (match.index > lastIndex) {
      parts.push(credit.slice(lastIndex, match.index));
    }
    // Add the link as a clickable <a> that opens in a new tab.
    parts.push(
      <a
        key={key++}
        href={match[0]}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-bright"
      >
        {match[0]}
      </a>
    );
    lastIndex = regex.lastIndex;
  }
  // Add whatever plain text remains after the last link.
  if (lastIndex < credit.length) {
    parts.push(credit.slice(lastIndex));
  }
  return parts;
}

export function ModelCredits({ credit }: { credit?: string }) {
  return (
    // The credit box. If a credit string was given, show it (with links),
    // otherwise just show the generic Sketchfab source note.
    <div className="mt-6 rounded-xl border border-line bg-surface-2/60 p-4">
      <div className="flex items-start gap-3">
        {/* Small award icon badge. */}
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-surface">
          <Award className="h-3.5 w-3.5 text-accent" strokeWidth={1.8} />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-[12px] font-semibold tracking-tight text-foreground">
            Model credit
          </p>
          {credit ? (
            <>
              {/* The credit text with any links rendered as clickable links. */}
              <p className="whitespace-pre-line break-words text-[11.5px] leading-relaxed text-foreground/90">
                {renderCredit(credit)}
              </p>
              <p className="text-[10.5px] text-muted-2">
                3D model sourced from Sketchfab
              </p>
            </>
          ) : (
            <p className="text-[11.5px] leading-relaxed text-muted">
              3D model sourced from Sketchfab
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
