import { ThemeSelect } from "./ThemeSelect";

export default function Header() {
  return (
    <header
      className="
        bg-white dark:bg-gray-800 
        border-b border-gray-200 dark:border-gray-700 
        shadow-sm
        sticky top-0 z-50
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            AI Chat Demo
          </h1>
          <ThemeSelect />
        </div>
      </div>
    </header>
  );
}
