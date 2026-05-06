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

const generateFake = (base = 2000, number = 5) => {
  const data: { date: string; uv: number }[] = [];

  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= daysInMonth[month]; day++) {
      const variation =
        Math.sin(day * 0.5) * number + 100 + Math.random() * number;

      const uv = Math.round(base + variation + month * number * 10);

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
        Orders: generateFake(200, 10),
        Users: generateFake(200, 10),
        Revenue: generateFake(3000, 50),
      },
    },

    {
      id: "asdsadsad",
      name: "Nigga Store",
      logo: "AudioLinesIcon",
      plan: "Enterprise",
      subdomain: "rich",
      analytics: {
        Orders: generateFake(200, 10),
        Users: generateFake(200, 10),
        Revenue: generateFake(3000, 50),
      },
    },

    {
      id: "asdsadsads",
      name: "Teemugang Store",
      logo: "TerminalIcon",
      plan: "Enterprise",
      subdomain: "rich",
      analytics: {
        Orders: generateFake(200, 10),
        Users: generateFake(200, 10),
        Revenue: generateFake(3000, 50),
      },
    },
  ];
  return shops;
}
