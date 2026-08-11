"use client";

// Waitlist signup form for the assembly "coming soon" page.
// This component runs in the browser and only ever touches the public API
// route (/api/waitlist). It holds no secrets and has no direct database
// access — all storage happens server-side in the route handler.
import { useState } from "react";

export function WaitlistForm() {
  // Controlled input value, plus a small state machine for feedback:
  // idle (form shown) -> sending (request in flight) -> done | error.
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent the default full-page reload; we submit with fetch instead.
    event.preventDefault();
    if (status === "sending") return;

    // Quick client-side guard so empty submissions never hit the network.
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      // Send only the email — the server owns validation + storage.
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      // The server always replies with either a `message` or an `error`.
      const data = await res.json();
      setMessage(data.message ?? data.error ?? "Something went wrong.");
      setStatus(res.ok ? "done" : "error");
    } catch {
      // Network failure (offline, server down) — never surface internals.
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-xl">
      {status === "done" ? (
        // Success state replaces the form so the user cannot double-submit.
        <p className="text-sm font-medium text-accent">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <label
            htmlFor="waitlist-email"
            className="text-sm font-medium text-foreground"
          >
            Join the waitlist and get notified when this feature is ready.
          </label>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <input
              id="waitlist-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-foreground placeholder:text-muted-2 focus:border-accent/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="shrink-0 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Joining…" : "Join the Waitlist"}
            </button>
          </div>
          {status === "error" && message && (
            <p className="text-sm text-red-400" role="alert">
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
