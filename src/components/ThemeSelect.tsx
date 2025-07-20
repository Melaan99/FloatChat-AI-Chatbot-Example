"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

export function ThemeSelect() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;

  return (
    <Select value={theme} onValueChange={(val) => setTheme(val)}>
      <SelectTrigger aria-label="Theme" className="w-32 flex justify-between">
        <SelectValue>
          {current === "dark"
            ? "Dark 🌙"
            : current === "light"
            ? "Light ☀️"
            : "System 💻"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          <SelectItem value="light">Light ☀️</SelectItem>
          <SelectItem value="dark">Dark 🌙</SelectItem>
          <SelectItem value="system">System 💻</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
