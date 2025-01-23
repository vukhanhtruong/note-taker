import { z } from "zod";
import { OpenAPIRoute, ZodRequestBody } from "chanfana";

export function DocsSchema(schema: {
  tags?: string[];
  summary?: string;
  request?: {
    query?: z.ZodTypeAny;
    params?: z.ZodTypeAny;
    body?: ZodRequestBody;
  };
  responses?: {
    [status: string]: {
      description: string;
      content: {
        [contentType: string]: {
          schema: z.ZodTypeAny;
        };
      };
    };
  };
  security?: any;
}) {
  return function (constructor: Function) {
    Reflect.defineMetadata("schema", schema, constructor);
  };
}

export abstract class DocsRoute extends OpenAPIRoute {
  schema = Reflect.getMetadata("schema", this.constructor);

  abstract handle(c): Promise<Response>;
}
