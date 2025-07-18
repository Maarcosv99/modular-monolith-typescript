import type { RestMiddleware } from 'http/rest/rest';

import type { NextFunction, Request, Response } from 'express';

export function expressMiddlewareAdapter(middleware: RestMiddleware) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    await Promise.resolve(
      middleware.handleRequest({
        body: request.body,
        params: request.params,
        query: request.query,
        headers: request.headers,
        method: request.method,
      })
        .then((response: any) => {
          if (response) {
            _response.status(response.status).json(response.body);
            Object.entries(response.headers ?? {}).forEach(([key, value]) => {
              _response.setHeader(key, value as string)
            });

            next(_response);
          }
          next();
        })
        .catch((error) => next(error))
    )
  }
}