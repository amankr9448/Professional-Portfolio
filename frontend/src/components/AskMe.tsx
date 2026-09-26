"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterMessage: Message = {
  role: "assistant",
  content: "Hi, I’m Ask Me. Ask about Aman’s experience, projects, stack, or anything else.",
};

export default function AskMe() {
  const [messages, setMessages] = useState<Message[]>([starterMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/assistant/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(1) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.reply);
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Ask Me request failed:", error);
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "I’m having trouble connecting right now. Please try again shortly." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="max-w-3xl rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <div className="max-h-[28rem] space-y-4 overflow-y-auto pr-1" aria-live="polite">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-auto max-w-[85%]" : "max-w-[85%]"}>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate">
              {message.role === "user" ? "You" : "Ask Me"}
            </p>
            <p className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "bg-steel/20 text-paper" : "border border-line bg-void text-paper/75"}`}>
              {message.content}
            </p>
          </div>
        ))}
        {isLoading && <p className="font-mono text-xs text-slate">Ask Me is thinking...</p>}
      </div>

      <form onSubmit={sendMessage} className="mt-6 flex gap-2">
        <label htmlFor="ask-me-input" className="sr-only">Ask a question</label>
        <input
          id="ask-me-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about Aman’s work..."
          maxLength={2000}
          disabled={isLoading}
          className="min-w-0 flex-1 rounded-lg border border-line bg-void px-3 py-3 text-sm text-paper outline-none placeholder:text-slate focus:border-steel"
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="rounded-lg bg-ochre px-4 py-3 font-mono text-xs font-medium text-void transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
          Send
        </button>
      </form>
      <p className="mt-3 font-mono text-[10px] text-slate">Powered by Groq’s free tier. Don’t share sensitive information.</p>
    </section>
  );
}
