"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    // 1) Add the user message
    const userMsg: Message = { id: uuidv4(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 2) TODO: replace with real API call
    // For now, echo back after a brief delay
    setTimeout(() => {
      const botMsg: Message = {
        id: uuidv4(),
        role: "bot",
        text: `You said: “${text}”`,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`
                max-w-xs px-4 py-2
                ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                }
              `}
            >
              {msg.text}
            </Card>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-t border-gray-200 dark:border-gray-700 p-4 gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" disabled={!input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
