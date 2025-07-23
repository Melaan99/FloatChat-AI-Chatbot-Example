"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import Together from "together-ai";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: string;
};

// Initialize Together
const together = new Together({
  apiKey: process.env.NEXT_PUBLIC_TOGETHER_API_KEY!,
});

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-focus after render or send
  useEffect(() => {
    textareaRef.current?.focus();
  }, [messages]);

  const handleSend = async (text: string) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // add user
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), role: "user", text, timestamp },
    ]);
    setIsLoading(true);

    try {
      const response = await together.chat.completions.create({
        model: "moonshotai/Kimi-K2-Instruct",
        messages: [{ role: "user", content: text }],
      });

      const reply =
        response.choices?.[0]?.message?.content?.trim() ??
        "Sorry, no response.";
      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // add bot
      setMessages((prev) => [
        ...prev,
        { id: uuidv4(), role: "bot", text: reply, timestamp: botTime },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    await handleSend(text);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        handleSend(input.trim());
        setInput("");
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800 relative">
        {/* top gradient */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-800"></div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "bot" && (
              <Avatar className="mr-2">
                <AvatarFallback>🤖</AvatarFallback>
              </Avatar>
            )}

            <div className="max-w-[70%]">
              <Card
                className={`rounded-lg px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-700 dark:text-gray-100"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </Card>
              <time className="block mt-1 text-xs text-gray-400 dark:text-gray-500">
                {msg.timestamp}
              </time>
            </div>

            {msg.role === "user" && (
              <Avatar className="ml-2">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <Card className="bg-white dark:bg-gray-700 dark:text-gray-100 max-w-[70%] px-4 py-2">
              <motion.span
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                typing…
              </motion.span>
            </Card>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-t border-gray-200 dark:border-gray-700 p-4 gap-2 bg-white dark:bg-gray-800"
      >
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message… (Enter to send, Shift+Enter for newline)"
          rows={2}
          className="flex-1 resize-none"
          disabled={isLoading}
        />
        <Button type="submit" disabled={!input.trim() || isLoading}>
          Send
        </Button>
      </form>
    </div>
  );
}
