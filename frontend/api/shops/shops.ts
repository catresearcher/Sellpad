"use client";

export function fetchShops() {
  const shops = [
    {
      id: "hjkjhkjhk",
      name: "Rich Store",
      logo: "CircleDollarSign",
      plan: "Enterprise",
      subdomain: "rich",
      analytics: {
        Products: 225,
        Users: 1725,
        Revenue: 120240,
      },
    },
    {
      id: "bgbgfhfgh",
      name: "Nigga Store",
      logo: "Swords",
      plan: "Startup",
      subdomain: "nigga",
      analytics: {
        Products: 15,
        Users: 55,
        Revenue: 4240,
      },
    },
    {
      id: "asdasdsad",
      name: "Teemugang Store",
      logo: "Users",
      plan: "Free",
      subdomain: "gang",
      analytics: {
        Products: 25,
        Users: 125,
        Revenue: 24240,
      },
    },
  ];
  return shops;
}
