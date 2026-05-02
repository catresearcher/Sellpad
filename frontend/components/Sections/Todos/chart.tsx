"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  TooltipContentProps,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { TodoProps } from "@/types/Todos";

const CustomTooltip = ({ active, payload, label }: TooltipContentProps) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="bg-card border border-border rounded p-2"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <>
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </>
      )}
    </div>
  );
};

type MonthlyGroup = {
  name: string;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  expert: number;
};

export default function TodoChart({ Todos }: TodoProps) {
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, "0");
    return `2026-${month}`;
  });

  const grouped = months.reduce<Record<string, MonthlyGroup>>((acc, month) => {
    acc[month] = {
      name: month,
      total: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      expert: 0,
    };
    return acc;
  }, {});

  Todos.forEach((todo) => {
    const month = todo.date.slice(0, 7);

    if (!grouped[month]) return;

    grouped[month].total += 1;
    grouped[month][todo.difficulty] += 1;
  });

  const monthlyData = Object.values(grouped);
  return (
    <Card className="col-span-1 md:col-span-1 lg:col-span-3 h-[50vh]">
      <CardHeader>
        <CardTitle className="text-sm">Todo Chart</CardTitle>
        <CardDescription className="text-xs">
          Chart of your todos
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip content={CustomTooltip} />

            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-3)"
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              dataKey="easy"
              stackId="1"
              stroke="var(--chart-1)"
              fill="url(#colorUv)"
            />
            <Area
              dataKey="medium"
              stackId="1"
              stroke="var(--chart-2)"
              fill="url(#colorPv)"
            />
            <Area
              dataKey="hard"
              stackId="1"
              stroke="var(--chart-3)"
              fill="url(#colorAmt)"
            />
            <Area
              dataKey="expert"
              stackId="1"
              stroke="var(--chart-4)"
              fill="var(--chart-4)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
