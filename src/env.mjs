import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This
   * way you can ensure the app isn't built with invalid env variables.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you
   * can ensure the app isn't built with invalid env vars. To expose
   * them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_FRONTEND_URL: z.string().optional(),
    NEXT_PUBLIC_BACKEND_URL: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes
   * (for example middlewares) or the client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env
   * validation. This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as the undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
