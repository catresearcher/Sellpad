import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

type Props = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

function CustomTooltip({ active, payload, label }: Props) {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;

  return (
    <div className="rounded p-3 shadow-md bg-card">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold text-foreground">
        ${value.toLocaleString()}
      </p>
    </div>
  );
}

export default function ShopRevenueChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="date"
          tickFormatter={(value) => format(new Date(value), "MMM dd")}
        />

        <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />

        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="uv"
          stroke="var(--primary)"
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
