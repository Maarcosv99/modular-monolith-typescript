import type { HttpResponse, MiddlewareRequest, RestMiddleware } from 'http/rest/rest';

import { z } from 'zod';

export class ValidatorMiddleware implements RestMiddleware {
  constructor(
    private readonly field: 'body' | 'query' | 'params' = 'body',
    private readonly schema: z.ZodSchema
  ) {}

  async handleRequest(request: MiddlewareRequest): Promise<void | HttpResponse<unknown>> {
    const parsedBody = this.schema.safeParse(request[this.field]);

    if (!parsedBody.success) {
      return {
        status: 400,
        body: { error: parsedBody.error.flatten().fieldErrors }
      }
    }
  }
}