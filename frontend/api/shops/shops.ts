"use client";

const daysInMonth: Record<number, number> = {
  0: 31, // Jan
  1: 28, // Feb (non-leap year)
  2: 31, // Mar
  3: 30, // Apr
  4: 31, // May
  5: 30, // Jun
  6: 31, // Jul
  7: 31, // Aug
  8: 30, // Sep
  9: 31, // Oct
  10: 30, // Nov
  11: 31, // Dec
};

const pad = (n: number) => String(n).padStart(2, "0");

const generateRevenue = (base = 2000) => {
  const data: { date: string; uv: number }[] = [];

  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= daysInMonth[month]; day++) {
      const variation = Math.sin(day * 0.5) * 812 + Math.random() * 572;

      const uv = Math.round(base + variation + month * 300);

      const date = `2026-${pad(month + 1)}-${pad(day)}`;

      data.push({ date, uv });
    }
  }

  return data;
};

const generateUsers = (base = 2000) => {
  const data: { date: string; uv: number }[] = [];

  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= daysInMonth[month]; day++) {
      const variation = Math.sin(day * 0.5) * 5 + Math.random() * 1;

      const uv = Math.round(base + variation + month * 3);

      const date = `2026-${pad(month + 1)}-${pad(day)}`;

      data.push({ date, uv });
    }
  }

  return data;
};

export function fetchShops() {
  const shops = [
    {
      id: "hjkjhkjhk",
      name: "Rich Store",
      logo: "GalleryVerticalEndIcon",
      plan: "Enterprise",
      subdomain: "rich",
      analytics: {
        Products: 225,
        Users: generateUsers(200),
        Revenue: generateRevenue(3000),
      },
    },

    {
      id: "asdsadsad",
      name: "Nigga Store",
      logo: "AudioLinesIcon",
      plan: "Enterprise",
      subdomain: "rich",
      analytics: {
        Products: 15,
        Users: generateUsers(200),
        Revenue: generateRevenue(1800),
      },
    },

    {
      id: "asdsadsad",
      name: "Teemugang Store",
      logo: "TerminalIcon",
      plan: "Enterprise",
      subdomain: "rich",
      analytics: {
        Products: 25,
        Users: generateUsers(200),
        Revenue: generateRevenue(1000),
      },
    },
  ];
  return shops;
}
