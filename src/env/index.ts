import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string({
    required_error: 'DATABASE_URL is required',
  }),
  PORT: z.number().default(3333),
});

const _env = envSchema.safeParse({
  ...process.env,
  PORT: Number(process.env.PORT),
});

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
