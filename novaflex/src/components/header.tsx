"use client";

import { useState } from "react";
import { Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  onUrlChange: (url: string) => void;
}

export function Header({ onUrlChange }: HeaderProps) {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl) {
      // Make sure URL has protocol
      let url = inputUrl;
      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }
      onUrlChange(url);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Monitor className="h-6 w-6 text-primary" />
          <span>NovaFlex</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-1 items-center gap-2 md:gap-4 mx-4">
          <Input
            type="text"
            placeholder="Enter website URL (e.g., example.com)"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="sm">
            Load
          </Button>
        </form>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
