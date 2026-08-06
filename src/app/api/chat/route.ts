import { NextResponse } from "next/server";
import { CHAT_MODELS } from "@/lib/chat/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MAX_HISTORY = 12;

const SYSTEM_PROMPT = `You are "Computer Anatomy", a friendly, accurate assistant for learning about computer hardware.

Your scope:
- Computer components: CPUs, GPUs, RAM, motherboards, storage (HDD, SATA SSD, M.2 NVMe), power supplies (PSU), UPS and AVR units, cooling (fans, radiators, water blocks), keyboards, mice, monitors, and cases.
- How components work, how to build or upgrade a PC, compatibility, and troubleshooting basics.
- The Computer Anatomy app: components such as the System Unit, CPU, Motherboard, RAM, GPU, SSD, M.2 SSD, HDD, PSU, CPU Cooler, Case Fans, Keyboard, Mouse, Monitor, UPS, and AVR can be explored interactively in 3D via the sidebar.

How to answer:
- Keep answers clear, concise, and educational. Use short paragraphs when helpful.
- Format your answers in clean Markdown so they render nicely: use bullet lists (-) for lists and Markdown tables (| column |) for comparisons or specs. Never use heading symbols (# or ##) — emphasize key terms with bold instead.
- Only answer computer-hardware and PC-building topics. If the user asks something unrelated, politely decline and offer to help with computer topics instead.
- NEVER invent or guess specific specifications, model numbers, prices, wattages, release dates, or benchmarks. If you are not certain about an exact number, say so honestly (e.g. "I'm not sure of the exact figure") and explain the general principle instead.
- Do not present opinions as facts. If an answer depends on brand, budget, or use case, say so and give balanced guidance.
- If you don't know something, admit it clearly. It is better to say "I don't know" than to make something up.
- When the user asks about a component in the app, feel free to mention they can select it in the sidebar to view its 3D model.`;

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

function modelPriority(): string[] {
  const override = process.env.OPENROUTER_MODEL?.trim();
  const base = CHAT_MODELS.map((m) => m.id);
  if (!override) return base;
  return [override, ...base.filter((id) => id !== override)];
}

export async function POST(request: Request) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  if (history.length === 0) {
    return NextResponse.json(
      { error: "No messages provided." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The AI assistant is not configured yet. Add OPENROUTER_API_KEY to your .env.local file and restart the dev server.",
      },
      { status: 500 }
    );
  }

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.slice(-MAX_HISTORY),
  ];

  const models = modelPriority();
  let lastError = "";

  for (const model of models) {
    try {
      const upstream = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "Computer Anatomy",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.4,
          max_tokens: 1024,
        }),
        signal: AbortSignal.timeout(30_000),
      });

      if (!upstream.ok) {
        lastError = `[chat] ${model} responded ${upstream.status}`;
        console.error(lastError);
        continue;
      }

      const data = await upstream.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (typeof reply === "string" && reply.trim().length > 0) {
        return NextResponse.json({ reply, model });
      }

      lastError = `[chat] ${model} returned an empty response`;
      console.error(lastError);
    } catch (err) {
      lastError = `[chat] ${model} failed: ${err}`;
      console.error(lastError);
    }
  }

  return NextResponse.json(
    {
      error:
        "The AI assistant couldn't respond right now — all models are unavailable. Please try again in a moment.",
    },
    { status: 502 }
  );
}
