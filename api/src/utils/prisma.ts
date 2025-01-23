import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

export function createPrismaClient(env: {
  STAGING_DB: D1Database;
}): PrismaClient {
  const adapter = new PrismaD1(env.STAGING_DB);
  return new PrismaClient({ adapter });
}
