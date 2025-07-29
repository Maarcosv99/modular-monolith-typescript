import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z.enum(['1h', '1d', '1w']),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z.enum(['1d', '7d']),
  REDIS_URL: z.string(),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error('[❌ Invalid Environment Variables]');
  console.error(envParsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const ConfigEnvSymbol = Symbol.for('ConfigEnv');

export const envConfig = {
  jwt: {
    accessTokenSecret: envParsed.data.JWT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: envParsed.data.JWT_REFRESH_TOKEN_SECRET,
    expiresIn: envParsed.data.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: envParsed.data.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
  redis: {
    url: envParsed.data.REDIS_URL,
  }
};

export type ConfigEnv = typeof envConfig;