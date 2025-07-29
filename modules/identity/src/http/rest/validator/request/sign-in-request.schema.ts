import type { SignInRequestDto } from '../../dto/request/sign-in-request.dto';

import { z } from 'zod';

export const signInRequestSchema: z.ZodType<SignInRequestDto> = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});