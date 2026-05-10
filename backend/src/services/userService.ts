import prisma from "../db";
import { createHash } from "crypto";
import type { Prisma, User } from "../lib/database/generated";

export async function findUserBySessiontoken(
  sessionToken: string,
): Promise<Pick<User, "id" | "username"> | null> {
  const tokenHash = createHash("sha256").update(sessionToken).digest("hex");

  return prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          token: tokenHash,
        },
      },
    },
    select: {
      id: true,
      username: true,
    },
  });
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
}
export async function findUserByUsername(
  username: string,
): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      username,
    },
  });
}

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  return prisma.user.create({ data });
}

export default {
  findUserBySessiontoken,
  findUserById,
  findUserByUsername,
  createUser,
};
