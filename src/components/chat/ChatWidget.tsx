"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Plus, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatHead } from "@/components/chat/ChatHead";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

type ChatThread = {
  id: string;
  title: string;
  messages: Message[];
};

const QUICK_PROMPTS = [
  "What is a GPU?",
  "How does RAM work?",
  "Explain the CPU",
  "How do I build a PC?",
];

const INVITE_PROMPTS = [
  "Hey, ask me anything!",
  "Want to ask something?",
  "Curious about a component?",
  "Explore PC hardware with me!",
];

const GREETING =
  "Hi! I'm the Computer Anatomy assistant. Ask me about any component — GPU, RAM, CPU, and more.";

const MAX_HISTORY = 12;
const STORAGE_KEY = "computer-anatomy-chats";

function truncateTitle(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 30 ? `${clean.slice(0, 30)}…` : clean;
}

function MessageText({ role, text }: { role: Message["role"]; text: string }) {
  if (role === "user") {
    return <span className="whitespace-pre-wrap">{text}</span>;
  }
  return (
    <div className="assistant-md">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}

function Typewriter({
  text,
  onTick,
  onDone,
}: {
  text: string;
  onTick: () => void;
  onDone: () => void;
}) {
  const [len, setLen] = useState(0);
  const finished = len >= text.length;

  useEffect(() => {
    if (finished) return;
    const rate = text.length > 1200 ? 4 : text.length > 500 ? 6 : 10;
    const id = window.setInterval(() => {
      onTick();
      setLen((l) => Math.min(l + 1, text.length));
    }, rate);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, finished]);

  useEffect(() => {
    if (finished) onDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  return (
    <div className="assistant-md">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text.slice(0, len)}</ReactMarkdown>
      <span className="typing-caret" aria-hidden="true" />
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [chats, setChats] = useState<ChatThread[]>([
    {
      id: "chat-initial",
      title: "New chat",
      messages: [{ id: 0, role: "assistant", text: GREETING }],
    },
  ]);
  const [activeChatId, setActiveChatId] = useState("chat-initial");

  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? chats[0];
  const messages = activeChat.messages;

  const [promptIdx, setPromptIdx] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    if (open) return;
    const visible = showPrompt;
    const id = window.setTimeout(
      () => {
        if (visible) {
          setShowPrompt(false);
        } else {
          setPromptIdx((i) => (i + 1) % INVITE_PROMPTS.length);
          setShowPrompt(true);
        }
      },
      visible ? 2000 : 3000
    );
    return () => window.clearTimeout(id);
  }, [open, showPrompt]);

  useEffect(() => {
    let cancelled = false;
    const id = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw || cancelled) return;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed?.chats) || parsed.chats.length === 0) return;
        setChats(parsed.chats);
        const active = parsed.chats.some((c: ChatThread) => c.id === parsed.activeId)
          ? parsed.activeId
          : parsed.chats[0].id;
        setActiveChatId(active);
        const maxId = parsed.chats.reduce(
          (max: number, c: ChatThread) =>
            Math.max(max, ...c.messages.map((m) => m.id)),
          0
        );
        idRef.current = maxId + 1;
      } catch {
        // ignore corrupted storage
      }
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ activeId: activeChatId, chats })
      );
    } catch {
      // storage unavailable (e.g. private mode)
    }
  }, [chats, activeChatId]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, pending, animatingId, open]);

  const newChat = () => {
    const chat: ChatThread = {
      id: `chat-${Date.now()}`,
      title: "New chat",
      messages: [{ id: idRef.current++, role: "assistant", text: GREETING }],
    };
    setChats((prev) => [...prev, chat]);
    setActiveChatId(chat.id);
    setInput("");
    setAnimatingId(null);
  };

  const send = async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || pending) return;

    const userMsg: Message = { id: idRef.current++, role: "user", text: value };
    setInput("");
    setPending(true);

    const isFirstUserMsg = messages.filter((m) => m.role === "user").length === 0;
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              title: isFirstUserMsg ? truncateTitle(value) : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    );

    const history: { role: "user" | "assistant"; content: string }[] = [
      ...messages.slice(-(MAX_HISTORY - 1)).map((m) => ({ role: m.role, content: m.text })),
      { role: "user", content: value },
    ];

    let reply = "";
    let isError = false;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json().catch(() => null);
      reply = data?.reply ?? data?.error ?? "Sorry, I couldn't get a response. Please try again.";
      isError = !data?.reply;
    } catch {
      reply = "Sorry, I couldn't reach the AI service. Please try again.";
      isError = true;
    }

    const assistantMsg: Message = { id: idRef.current++, role: "assistant", text: reply };
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId ? { ...c, messages: [...c.messages, assistantMsg] } : c
      )
    );
    setPending(false);
    if (!isError) setAnimatingId(assistantMsg.id);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_0_0_1px_rgba(77,141,255,0.08),0_0_46px_rgba(77,141,255,0.14),0_24px_70px_rgba(2,6,16,0.6)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-accent/18 via-accent/6 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-accent/8 to-transparent"
            />
            <header className="relative flex items-center gap-2 border-b border-line bg-surface-2/60 px-4 py-3.5">
              <span className="relative flex aspect-[682/902] h-12 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                <ChatHead />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="truncate text-[13.5px] font-semibold tracking-tight text-foreground">
                  {activeChat.title}
                </p>
              </div>
              <button
                type="button"
                aria-label="New chat"
                onClick={newChat}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <Plus className="h-4 w-4" strokeWidth={1.8} />
              </button>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </header>

            <div className="thin-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4" ref={scrollRef}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-accent text-white"
                        : "rounded-bl-md border border-line bg-surface-2 text-foreground/90"
                    )}
                  >
                    {m.id === animatingId ? (
                      <Typewriter
                        key={m.id}
                        text={m.text}
                        onTick={scrollToBottom}
                        onDone={() => setAnimatingId(null)}
                      />
                    ) : (
                      <MessageText role={m.role} text={m.text} />
                    )}
                  </div>
                </div>
              ))}
              {pending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-surface-2 px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.18,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-muted"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-line px-3 pt-2.5">
              <div className="mb-2.5 flex gap-1.5 overflow-x-auto">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="shrink-0 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[11px] text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 pb-3">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about a component…"
                  className="h-10 flex-1 rounded-xl border border-line bg-surface-2 px-3.5 text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-2 focus:border-accent/50"
                />
                <button
                  type="button"
                  aria-label="Send message"
                  onClick={() => send()}
                  disabled={!input.trim() || pending}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-all hover:bg-accent-bright disabled:opacity-40"
                >
                  <Send className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        {!open && (
          <AnimatePresence>
            {showPrompt && (
              <motion.button
                type="button"
                aria-label="Ask the assistant"
                onClick={() => setOpen(true)}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-2.5 text-[13px] font-medium text-foreground shadow-[0_10px_30px_rgba(2,6,16,0.35)] transition-colors hover:border-accent/40"
              >
                <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                <span className="block whitespace-nowrap">
                  {INVITE_PROMPTS[promptIdx]}
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        )}
        <motion.button
          type="button"
          aria-label="Open AI assistant"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative aspect-[682/902] h-20 overflow-hidden rounded-xl"
        >
          <ChatHead />
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
