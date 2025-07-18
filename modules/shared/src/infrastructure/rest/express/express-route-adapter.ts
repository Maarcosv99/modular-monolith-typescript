import type { RestController } from 'http/rest/rest';

import type { Request, Response } from 'express';

export function expressRouteAdapter<T>(controller: RestController<T>) {
  return async (request: Request, response: Response) => {
    await Promise.resolve(controller.handleRequest({
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers,
    })).then((httpResponse) => {
      response.status(httpResponse.status).json(httpResponse.body);
      Object.entries(httpResponse.headers ?? {}).forEach(([key, value]) => {
        response.setHeader(key, value)
      });
    }).catch((error) => {
      response.status(500).json({
        message: 'Internal Server Error'
      });
    })
  }
}