"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type MultiSelectItem = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  items: MultiSelectItem[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
}

export default function MultiSelect({
  items,
  selected,
  setSelected,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleItem = (value: string) => {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const removeItem = (value: string) => {
    setSelected((current) => current.filter((item) => item !== value));
  };

  const selectedItems = items.filter((item) => selected.includes(item.value));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="min-h-10 h-auto w-full justify-between px-3 py-2"
        >
          <div className="flex flex-wrap gap-1">
            {selectedItems.length > 0 ? (
              <>
                {selectedItems.slice(0, 3).map((item) => (
                  <Badge key={item.value} variant="secondary" className="gap-1">
                    {item.label}

                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.value);
                      }}
                      className="cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))}

                {selectedItems.length > 3 && (
                  <Badge variant="secondary">+{selectedItems.length - 3}</Badge>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-75 p-0!">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />

          <hr className="h-1 bg-card/25!"></hr>

          <CommandEmpty>{emptyText}</CommandEmpty>

          <CommandGroup className="max-h-64 overflow-auto ">
            {items.map((item) => {
              const isSelected = selected.includes(item.value);

              return (
                <CommandItem
                  key={item.value}
                  onSelect={() => toggleItem(item.value)}
                  className="flex items-center justify-between bg-transparent! font-medium!"
                >
                  <span>{item.label}</span>

                  <Check
                    className={cn(
                      "h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
