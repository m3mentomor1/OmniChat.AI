"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ModelSelector from "./ModelSelector";
import ReactMarkdown from "react-markdown";
import ThemeToggle from "@/components/ThemeToggle"; // ⬅️ Import the theme toggle button

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatInterface() {
  const [selectedModel, setSelectedModel] = useState(
    "microsoft/phi-4-reasoning-plus:free"
  );
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const modelLabels: Record<string, string> = {
    "microsoft/phi-4-reasoning-plus:free": "Phi 4 Reasoning Plus (Microsoft)",
    "meta-llama/llama-3.3-8b-instruct:free": "Llama 3.3 8B Instruct (Meta)",
    "deepseek/deepseek-r1-0528-qwen3-8b:free":
      "Deepseek R1 0528 Qwen3 8B (DeepSeek)",
    "google/gemma-3-12b-it:free": "Gemma 3 12B (Google)",
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, model: selectedModel }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "No response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error: Unable to fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Fixed Top-Left Title */}
      {messages.length > 0 && (
        <div className="fixed top-4 left-4 z-50">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            OmniChat.AI
          </h1>
        </div>
      )}

      {/* Fixed Theme Toggle */}
      <ThemeToggle />

      <div
        className={`relative max-w-3xl mx-auto p-4 space-y-6 ${
          messages.length > 0 ? "pt-20" : "mt-10"
        }`}
      >
        {/* Centered Header (when no chat) */}
        {messages.length === 0 && (
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              OmniChat.AI
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              Chat with multiple language models.
            </p>
          </div>
        )}

        {/* Chat History */}
        {messages.length > 0 && (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap p-3 rounded-xl max-w-[80%] ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-100 dark:bg-blue-800 text-left"
                    : "mr-auto bg-gray-100 dark:bg-gray-800 text-left"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="text-xs font-semibold mb-1 text-left">
                    {modelLabels[selectedModel] ?? "AI"}
                  </div>
                )}

                <div className="prose dark:prose-invert text-sm">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="mr-auto bg-gray-100 dark:bg-gray-800 rounded-xl p-3 max-w-[80%]">
                <div className="text-xs font-semibold mb-1">
                  {modelLabels[selectedModel] ?? "AI"}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Typing...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Input & Model Selector */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="w-full sm:w-auto">
                <ModelSelector
                  selectedModel={selectedModel}
                  onChange={setSelectedModel}
                />
              </div>
            </div>

            <Textarea
              rows={3}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <div className="flex justify-end">
              <Button onClick={sendMessage} disabled={loading || !input.trim()}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
