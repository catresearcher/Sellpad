"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ShopAnalyticDate({
  date,
  setDate,
}: {
  date: DateRange | undefined;
  setDate: (value: DateRange | undefined) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    date?.from ?? new Date(),
  );

  const now = new Date();

  const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

  const endOfMonth = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth() + 1, 0);

  const startOfYear = (d: Date) => new Date(d.getFullYear(), 0, 1);

  const endOfYear = (d: Date) => new Date(d.getFullYear(), 11, 31);

  const startOfWeek = (d: Date) => {
    const date = new Date(d);
    date.setDate(date.getDate() - date.getDay());
    return date;
  };

  const endOfWeek = (d: Date) => {
    const date = startOfWeek(d);
    date.setDate(date.getDate() + 6);
    return date;
  };

  const presets = [
    {
      label: "All Time",
      getRange: () => undefined,
    },

    {
      label: "This Year",
      getRange: () => ({
        from: startOfYear(now),
        to: now,
      }),
    },

    {
      label: "Last Year",
      getRange: () => {
        const lastYear = new Date(now.getFullYear() - 1, 0, 1);
        return {
          from: startOfYear(lastYear),
          to: endOfYear(lastYear),
        };
      },
    },

    {
      label: "This Month",
      getRange: () => ({
        from: startOfMonth(now),
        to: now,
      }),
    },

    {
      label: "Last Month",
      getRange: () => {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth),
        };
      },
    },

    {
      label: "This Week",
      getRange: () => ({
        from: startOfWeek(now),
        to: now,
      }),
    },

    {
      label: "Last Week",
      getRange: () => {
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);

        return {
          from: startOfWeek(lastWeek),
          to: endOfWeek(lastWeek),
        };
      },
    },
  ];

  return (
    <Field className="mx-auto mr-0 w-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="h-10 justify-start px-2.5 font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="flex w-auto items-stretch gap-4 p-4"
          align="end"
        >
          <div className="flex flex-col self-stretch">
            <div className="flex flex-1 flex-col gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  className="w-full justify-start cursor-pointer"
                  onClick={() => {
                    const range = preset.getRange();

                    setDate(range);

                    if (range?.from) {
                      setCurrentMonth(
                        new Date(
                          range.from.getFullYear(),
                          range.from.getMonth(),
                          1,
                        ),
                      );
                    }
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          <Calendar
            mode="range"
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            selected={date}
            onSelect={(range) => setDate(range ?? undefined)}
            fixedWeeks
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
