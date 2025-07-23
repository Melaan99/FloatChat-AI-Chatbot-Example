"use client";

import ChatInterface from "@/components/ChatInterface";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* ——— Page Content ——— */}

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Build Smarter, Faster</h2>
          <p className="text-lg text-gray-700">
            Acme Widgets helps you automate your workflow with AI-powered
            chatbots, so you can focus on what really matters.
          </p>
          <Button size="lg">Get Started Free</Button>
        </section>

        {/* Features */}
        <section
          id="features"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Instant Replies</h3>
            <p>
              Deploy a chatbot that answers customer questions instantly—24/7
              support without the extra headcount.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
            <p>
              Plug into your website or app in minutes with our simple React
              SDK—and customize every bit of UI to match your brand.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p>
              Track conversations in real time, see engagement metrics, and
              optimize prompts for better conversions.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Secure & Scalable</h3>
            <p>
              Your data stays private, and our servers auto-scale to handle
              spikes in traffic—no DevOps needed.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="space-y-8 text-center">
          <h2 className="text-3xl font-bold">Pricing Plans</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="border rounded-lg p-6 flex-1">
              <h3 className="text-2xl font-semibold mb-2">Starter</h3>
              <p className="text-4xl font-bold mb-4">
                $0<span className="text-lg">/mo</span>
              </p>
              <ul className="space-y-2 text-left mb-6">
                <li>Up to 1,000 messages</li>
                <li>Email support</li>
                <li>Basic analytics</li>
              </ul>
              <Button>Choose Starter</Button>
            </div>
            <div className="border rounded-lg p-6 flex-1 bg-indigo-50 dark:bg-indigo-900">
              <h3 className="text-2xl font-semibold mb-2">Pro</h3>
              <p className="text-4xl font-bold mb-4">
                $49<span className="text-lg">/mo</span>
              </p>
              <ul className="space-y-2 text-left mb-6">
                <li>Up to 100,000 messages</li>
                <li>Priority support</li>
                <li>Advanced analytics</li>
              </ul>
              <Button variant="default">Choose Pro</Button>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-gray-700">
            Questions? Send us an email at{" "}
            <a
              href="mailto:support@acmewidgets.com"
              className="text-indigo-600 hover:underline"
            >
              support@acmewidgets.com
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-6 text-center">
        © {new Date().getFullYear()} Acme Widgets. All rights reserved.
      </footer>

      {/* ——— Floating Chat Dialog ——— */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="
      fixed bottom-6 right-6
      p-6 px-10              
      rounded-full
      bg-blue-600 text-white
      hover:bg-blue-700
      shadow-lg
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    "
          >
            <MessageSquareMore className="w-12 h-8" />
          </Button>
        </DialogTrigger>

        <DialogContent
          className="
           
            w-[90vw] max-w-md
            h-[80vh]
            p-0
            bg-white dark:bg-gray-800
            rounded-lg shadow-2xl
            flex flex-col
            overflow-auto
          "
        >
          <DialogHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle>Chat with Us</DialogTitle>
            <DialogClose className="absolute top-4 right-4" />
          </DialogHeader>
          <div className="flex-1">
            <ChatInterface />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
