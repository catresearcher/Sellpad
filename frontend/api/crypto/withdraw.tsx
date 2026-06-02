const withdraws = [
  {
    status: "Completed",
    method: "Bitcoin",
    amount: 0.02451,
    usdValue: 1684.22,
    recipient: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    transactionId: "TXN-8F2A91BC",
    date: "2026-05-16 14:22",
  },
  {
    status: "Completed",
    method: "Bitcoin",
    amount: 0.02451,
    usdValue: 1684.22,
    recipient: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    transactionId: "TXN-8F2A91BC",
    date: "2026-05-16 14:22",
  },
  {
    status: "Completed",
    method: "Bitcoin",
    amount: 0.02451,
    usdValue: 1684.22,
    recipient: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    transactionId: "TXN-8F2A91BC",
    date: "2026-05-16 14:22",
  },
  {
    status: "Completed",
    method: "Ethereum",
    amount: 1.2534,
    usdValue: 3820.14,
    recipient: "0x91ca3f2D7eE45B8F2b91FadE2A8e8A2F8b12c77A",
    transactionId: "TXN-4D8BC712",
    date: "2026-05-15 09:11",
  },
  {
    status: "Completed",
    method: "Ethereum",
    amount: 52.4,
    usdValue: 7312.9,
    recipient: "9xQeWvG816bUx9EPjHmaT23yvVM5hQj7vR7sY8Kx9j3d",
    transactionId: "TXN-1AF72E98",
    date: "2026-05-14 19:45",
  },
  {
    status: "Completed",
    method: "Bitcoin",
    amount: 2500,
    usdValue: 2500,
    recipient: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    transactionId: "TXN-2BC8A6FF",
    date: "2026-05-13 11:30",
  },
  {
    status: "Completed",
    method: "Ethereum",
    amount: 1.2534,
    usdValue: 3820.14,
    recipient: "0x91ca3f2D7eE45B8F2b91FadE2A8e8A2F8b12c77A",
    transactionId: "TXN-4D8BC712",
    date: "2026-05-15 09:11",
  },
  {
    status: "Completed",
    method: "Ethereum",
    amount: 52.4,
    usdValue: 7312.9,
    recipient: "9xQeWvG816bUx9EPjHmaT23yvVM5hQj7vR7sY8Kx9j3d",
    transactionId: "TXN-1AF72E98",
    date: "2026-05-14 19:45",
  },
  {
    status: "Completed",
    method: "Bitcoin",
    amount: 2500,
    usdValue: 2500,
    recipient: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    transactionId: "TXN-2BC8A6FF",
    date: "2026-05-13 11:30",
  },
  {
    status: "Completed",
    method: "Ethereum",
    amount: 1.2534,
    usdValue: 3820.14,
    recipient: "0x91ca3f2D7eE45B8F2b91FadE2A8e8A2F8b12c77A",
    transactionId: "TXN-4D8BC712",
    date: "2026-05-15 09:11",
  },
  {
    status: "Completed",
    method: "Ethereum",
    amount: 52.4,
    usdValue: 7312.9,
    recipient: "9xQeWvG816bUx9EPjHmaT23yvVM5hQj7vR7sY8Kx9j3d",
    transactionId: "TXN-1AF72E98",
    date: "2026-05-14 19:45",
  },
  {
    status: "Completed",
    method: "Bitcoin",
    amount: 2500,
    usdValue: 2500,
    recipient: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    transactionId: "TXN-2BC8A6FF",
    date: "2026-05-13 11:30",
  },
];

const PAGE_SIZE = 10;

export async function fetchWithdraws(
  shopId: number,
  page: number = 1,
): Promise<any> {
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const paginatedWithdraws = withdraws.slice(start, end);

  return {
    withdraws: paginatedWithdraws,
    pages: {
      totalPages: Math.ceil(withdraws.length / PAGE_SIZE),
      totalCount: withdraws.length,
      currentPage: page,
    },
  };
}
