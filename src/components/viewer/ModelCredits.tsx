"use client";

import { Award } from "lucide-react";

const URL_PATTERN = /https?:\/\/[^\s)]+/g;

function renderCredit(credit: string) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(URL_PATTERN.source, "g");
  let key = 0;
  while ((match = regex.exec(credit)) !== null) {
    if (match.index > lastIndex) {
      parts.push(credit.slice(lastIndex, match.index));
    }
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
  if (lastIndex < credit.length) {
    parts.push(credit.slice(lastIndex));
  }
  return parts;
}

export function ModelCredits({ credit }: { credit?: string }) {
  return (
    <div className="mt-6 rounded-xl border border-line bg-surface-2/60 p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-surface">
          <Award className="h-3.5 w-3.5 text-accent" strokeWidth={1.8} />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-[12px] font-semibold tracking-tight text-foreground">
            Model credit
          </p>
          {credit ? (
            <>
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
