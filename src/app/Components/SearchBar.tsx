import type React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}


export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={value}
          onChange={onChange}
          className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-sm focus-visible:ring-blue-400"
        />
        <Button
          type="submit"
          className="rounded-full bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
}
