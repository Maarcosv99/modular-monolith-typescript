import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z.enum(['1h', '1d', '1w', '5m']),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z.enum(['1d', '7d']),
  REDIS_URL: z.string(),
  POSTGRES_URL: z.string(),
  KAFKA_CLIENT_ID: z.string(),
  KAFKA_BROKERS: z.string(),
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
  },
  postgres: {
    url: envParsed.data.POSTGRES_URL,
  kafka: {
    client_id: envParsed.data.KAFKA_CLIENT_ID,
    brokers: envParsed.data.KAFKA_BROKERS.split(','),
  }
};

export type ConfigEnv = typeof envConfig;