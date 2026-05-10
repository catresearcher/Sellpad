import { PrismaClient } from "./lib/database/generated";

declare global {
  var db: PrismaClient | undefined;
}

const prisma: PrismaClient = globalThis.db ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.db = prisma;
}

export default prisma;
