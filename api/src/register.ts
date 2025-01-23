import { createPrismaClient } from "./utils/prisma";
import { container } from "tsyringe";
import { AppToken } from "./apps/app.token";
import { Context } from "hono";
import { NoteProvider } from "@apps/note/provider";
import { UserProvider } from "@apps/user/provider";

export const registerDI = async (context: Context, next) => {
  if (process.env.NODE_ENV === "test") {
    return await next();
  }

  // Register the environment instance in the container
  container.registerInstance("Env", context.env);

  // Register Prisma client in the DI container using the Cloudflare Workers environment bindings
  container.register(AppToken.ORM_CLIENT, {
    useFactory: () => createPrismaClient(context.env),
  });

  NoteProvider.register(container);
  UserProvider.register(container);

  await next();
};
