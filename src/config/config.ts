import { z } from "zod";

const envSchema = z.object({
  APP_NAME: z.string().default("Administrador Kaybel"),
  NEXT_PUBLIC_REQUEST_BODY_OBFUSCATION: z
    .enum(["true", "false"])
    .default("true"),
  NEXT_PUBLIC_REQUEST_URL_OBFUSCATION: z
    .enum(["true", "false"])
    .default("true"),
  NEXT_PUBLIC_API_URL: z.url().default("http://localhost:4002"),
});

const _env = envSchema.safeParse({
  APP_NAME: process.env.APP_NAME,
  NEXT_PUBLIC_REQUEST_BODY_OBFUSCATION:
    process.env.NEXT_PUBLIC_REQUEST_BODY_OBFUSCATION,
  NEXT_PUBLIC_REQUEST_URL_OBFUSCATION:
    process.env.NEXT_PUBLIC_REQUEST_URL_OBFUSCATION,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!_env.success) {
  console.error("❌ Error de configuración en variables de entorno:");
  console.error(_env.error.format());

  if (typeof window === "undefined") {
    throw new Error(
      "Variables de entorno inválidas o faltantes. Revisa tu consola.",
    );
  }
}

export const env = {
  appName: _env.data?.APP_NAME || "Administrador Kaybel",
  apiUrl: _env.data?.NEXT_PUBLIC_API_URL || "http://localhost:4002",
  isRequestBodyObfuscated:
    _env.data?.NEXT_PUBLIC_REQUEST_BODY_OBFUSCATION === "true" ? true : false,
  isRequestUrlObfuscated:
    _env.data?.NEXT_PUBLIC_REQUEST_URL_OBFUSCATION === "true" ? true : false,
} as const;
