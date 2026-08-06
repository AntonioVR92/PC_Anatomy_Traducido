export type ChatModel = {
  id: string;
  label: string;
  provider: string;
  free: boolean;
};

// Priority order for the assistant: the first model is tried first, and if it
// fails the assistant falls back to the next one in the list.
export const CHAT_MODELS: ChatModel[] = [
  {
    id: "openai/gpt-oss-20b:free",
    label: "GPT-OSS 20B",
    provider: "OpenAI",
    free: true,
  },
  {
    id: "google/gemma-4-26b-a4b-it:free",
    label: "Gemma 4 26B",
    provider: "Google",
    free: true,
  },
  {
    id: "nvidia/nemotron-3-ultra-550b-a55b:free",
    label: "Nemotron 3 Ultra 550B",
    provider: "NVIDIA",
    free: true,
  },
];
