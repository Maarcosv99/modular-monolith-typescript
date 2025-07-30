import type { RefreshTokenRequestDto } from '../../dto/request/refresh-token-request.dto';

import { z } from 'zod';

export const refreshTokenRequestSchema: z.ZodType<RefreshTokenRequestDto> = z.object({
  refreshToken: z.string(),
});