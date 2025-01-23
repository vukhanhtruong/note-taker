import "reflect-metadata";
import { fromHono } from "chanfana";
import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { registerDI } from "register";
import { noteRoutes } from "@apps/note/controller/http/note.route";
import { userRoutes } from "@apps/user/controller/http/user.route";
import { HTTPException } from "hono/http-exception";

const api = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(api, {
  base: "/v1",
  docs_url: "/docs",
  openapi_url: "/openapi.json",
  schema: {
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
});

openapi.registry.registerComponent("securitySchemes", "BearerAuth", {
  type: "http",
  scheme: "bearer",
});

openapi.use("*", registerDI);
noteRoutes(openapi);
userRoutes(openapi);

openapi.onError((err, c) => {
  console.log(err);
  // Catching http exception from Hono framework, E.g: BearerAuth
  if (err instanceof HTTPException) {
    return c.json({ message: err.getResponse().statusText }, err.status);
  }
});

const app = new Hono();
app.use(etag(), logger());
app.route("/v1", api);

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    const { success } = await env.API_RATE_LIMITER.limit({ key: pathname });
    if (!success) {
      return new Response(`429 Failure – rate limit exceeded for ${pathname}`, {
        status: 429,
      });
    }

    // Check if the request matches Hono API routes
    const res = await app.fetch(request, env, ctx);
    return res;
  },
};
