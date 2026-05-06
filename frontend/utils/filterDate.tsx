import { isWithinInterval } from "date-fns";

export function filteredAnalytics(
  data: { date: string; uv: number }[],
  from?: Date,
  to?: Date,
) {
  if (!from || !to) return data;

  return data.filter((item) =>
    isWithinInterval(new Date(item.date), {
      start: from,
      end: to,
    }),
  );
}
