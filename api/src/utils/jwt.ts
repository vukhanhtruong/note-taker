import { UniqueID } from "@core/unique-id";
import { Context } from "hono";
import { verify, decode } from "hono/jwt";

export const verifyToken = async (
  token,
  context: Context,
): Promise<boolean> => {
  try {
    await verify(token, context.env.JWT_SECRET);
    const { payload } = decode(token);
    const { sub, role } = payload;
    context.set("user-info", { userId: new UniqueID(sub as string), role });

    return true;
  } catch (err) {
    return false;
  }
};
