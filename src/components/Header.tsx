import { ThemeSelect } from "./ThemeSelect";

export default function Header() {
  return (
    <header
      className="
        bg-white dark:bg-gray-800 
        border-b border-gray-200 dark:border-gray-700 
        shadow-sm
        sticky top-0 z-50 py-6
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            FloatChat – AI-Powered Chatbot
          </h1>
          <nav className="space-x-4">
            <a href="#features" className="hover:underline">
              Features
            </a>
            <a href="#pricing" className="hover:underline">
              Pricing
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </nav>{" "}
          <ThemeSelect />
        </div>
      </div>
    </header>
  );
}
