import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z.enum(['1h', '1d', '1w', '5m']),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z.enum(['1d', '7d']),
  REDIS_URL: z.string(),
  POSTGRES_URL: z.string(),
  RESEND_URL: z.string(),
  RESEND_EMAIL_FROM: z.string(),
  RESEND_EMAIL_DOMAIN: z.string(),
  KAFKA_CLIENT_ID: z.string(),
  KAFKA_BROKERS: z.string(),
  KAFKA_GROUP_ID: z.string(),
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
  },
  resend: {
    url: envParsed.data.RESEND_URL,
    email: envParsed.data.RESEND_EMAIL_FROM,
    domain: envParsed.data.RESEND_EMAIL_DOMAIN
  },
  kafka: {
    client_id: envParsed.data.KAFKA_CLIENT_ID,
    brokers: envParsed.data.KAFKA_BROKERS.split(','),
    group_id: envParsed.data.KAFKA_GROUP_ID,
  }
};

export type ConfigEnv = typeof envConfig;
