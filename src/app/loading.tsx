// Route-level loading state shown briefly while a page streams in.

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
        <p className="text-[12px] text-muted-2">Loading…</p>
      </div>
    </div>
  );
}
