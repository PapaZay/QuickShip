import zod from "zod";

const envSchema = zod.object({
    DATABASE_URL: zod.string().min(1),
    GOOGLE_CLIENT_ID: zod.string().min(1),
    GOOGLE_CLIENT_SECRET: zod.string().min(1),
    NEXTAUTH_URL: zod.string().min(1),
    NEXTAUTH_SECRET: zod.string().min(1),
    STRIPE_SECRET_KEY: zod.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: zod.string().min(1)
});

export const env = envSchema.parse(process.env);