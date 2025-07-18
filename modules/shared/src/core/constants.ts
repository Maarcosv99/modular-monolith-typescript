export default {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  SERVER_PORT: Number(process.env.SERVER_PORT ?? 3000),
  PREFIX_API: '/api/v1',
}