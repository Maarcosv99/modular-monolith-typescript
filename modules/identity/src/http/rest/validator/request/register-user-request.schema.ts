import { z } from 'zod';

import type { RegisterUserRequestDto } from 'http/rest/dto/request/register-user-request.dto';

export const registerUserRequestSchema: z.ZodSchema<RegisterUserRequestDto> = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});