import { Str } from "chanfana";
import { z } from "zod";

export const AI = z.object({
  prompt: Str({ required: false }),
});
