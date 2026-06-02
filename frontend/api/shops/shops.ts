"use client";

import { HandleRequestError } from "@/lib/errorHandler";

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

const generateFake = (base = 200, number = 2) => {
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

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createShop({ name, subdomain, description }: any) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`${apiUrl}/shop/create`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name,
        subdomain,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    const json = await response.json();

    if (!response.ok) throw Error(json.message || "Shop creation failed");

    return json.shop;
  } catch (error: string | unknown) {
    HandleRequestError("Shop creation failed", error);
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchShops() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(`${apiUrl}/user/shops`, {
      method: "GET",
      credentials: "include",
      signal: controller.signal,
    });

    const json = await response.json();

    if (!response.ok)
      throw Error(json.message || "Login failed, try again later");

    return json;
  } catch (error: string | unknown) {
    HandleRequestError("Login failed, try again later", error);
  } finally {
    clearTimeout(timeout);
  }
}
