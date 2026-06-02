import { randomBytes, createHash } from "crypto";
import { Prisma, Session, User } from "../lib/database/generated";
import prisma from "../db";

export async function createSession(userId: string): Promise<string> {
  try {
    const token = randomBytes(48).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");

    await prisma.session.create({
      data: {
        userId,
        token: tokenHash,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return token;
  } catch (error) {
    console.error("Failed to create session:", error);
    throw error;
  }
}

export async function deleteSessionById(sessionId: number): Promise<Session> {
  try {
    return prisma.session.delete({
      where: { id: sessionId },
    });
  } catch (error) {
    console.error("Failed to delete session:", error);
    throw error;
  }
}

export async function deleteAllUsersSessions(
  userId: string,
): Promise<Prisma.BatchPayload> {
  try {
    return prisma.session.deleteMany({
      where: { userId },
    });
  } catch (error) {
    console.error("Failed to delete sessions:", error);
    throw error;
  }
}

export async function findSessionById(
  sessionId: number,
): Promise<(Session & { user: User }) | null> {
  return prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });
}

export async function findSessionWithUserByToken(token: string): Promise<
  | (Session & {
      user: Omit<User, "password">;
    })
  | null
> {
  const tokenHash = createHash("sha256").update(token).digest("hex");

  return prisma.session.findUnique({
    where: { token: tokenHash },
    include: {
      user: true,
    },
  });
}

export async function logout(token: string): Promise<void> {
  const tokenHash = createHash("sha256").update(token).digest("hex");
  try {
    await prisma.session.delete({
      where: { token: tokenHash },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return;
    }
    throw err;
  }
}

export default {
  createSession,
  deleteSessionById,
  deleteAllUsersSessions,
  findSessionById,
  findSessionWithUserByToken,
  logout,
};
