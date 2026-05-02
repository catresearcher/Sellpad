"use client";

import {
  Card,
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
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { TodoProps } from "@/types/Products";

type MonthlyGroup = {
  name: string;
  total: number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-card border border-border rounded p-2">
      <p>{`${label} : ${payload[0].value}`}</p>
      <p className="text-xs opacity-70">Monthly todo count</p>
    </div>
  );
};

export default function TodoChart({ Todos }: TodoProps) {
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, "0");
    return `2026-${month}`;
  });

  const grouped: Record<string, MonthlyGroup> = {};

  months.forEach((month) => {
    grouped[month] = {
      name: month,
      total: 0,
    };
  });

  Todos.forEach((todo) => {
    const month = todo.date.slice(0, 7);
    if (grouped[month]) grouped[month].total += 1;
  });

  const monthlyData = months.map((m) => grouped[m]);
  const maxValue = Math.max(...monthlyData.map((d) => d.total));
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
            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" />
            <YAxis domain={[0, maxValue + 2]} />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="total"
              stroke="var(--chart-1)"
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
