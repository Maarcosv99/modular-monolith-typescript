export interface HttpRequest<Body = any, Params = any, Query = any, Headers = any, Data=any> {
  body?: Body;
  params?: Params;
  query?: Query;
  headers?: Headers
  data?: Data
}

export enum HttpStatus {
  successRequest = 200,
  createdRequest = 201,
  unAuthorizedRequest = 401,
  forbiddenRequest = 403,
  badRequest = 400,
  internalServerErrorRequest = 500,
  notFoundRequest = 404,
  payloadTooLargeRequest = 413,
  unprocessableEntityRequest = 422,
  temporaryRedirectRequest = 307,
}

export interface HttpResponse<T> {
  status: HttpStatus
  body?: T
  headers?: Record<string, string>
}

export interface MiddlewareRequest extends HttpRequest {
  method?: string
}

export interface RestController<T = unknown> {
  handleRequest(request: HttpRequest): Promise<HttpResponse<T>>
}

export interface RestControllerConfig<T = unknown> {
  path: string
  router: T
}

export interface RestMiddleware<T = unknown> {
  handleRequest(request: MiddlewareRequest): Promise<T | never>
}

export type RestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'

export interface RestServerConfig {
  port: number
  basePath: string
  middlewares: RestMiddleware[]
}

export class RestRoute {
  private _middlewares: RestMiddleware[] = []
  private _controller: RestController<unknown> | null = null

  private constructor(
    private readonly _method: RestMethod | RestMethod[],
    private readonly _path: string,
  ) {}

  static get(path: string): RestRoute {
    return new RestRoute('get', path);
  }

  static post(path: string): RestRoute {
    return new RestRoute('post', path);
  }

  static put(path: string): RestRoute {
    return new RestRoute('put', path);
  }

  static delete(path: string): RestRoute {
    return new RestRoute('delete', path);
  }

  middlewares(...middlewares: RestMiddleware[]): RestRoute {
    this._middlewares = middlewares;
    return this;
  }

  controller(controller: RestController): RestRoute {
    this._controller = controller;
    return this;
  }

  get routeData() {
    return {
      method: this._method,
      path: this._path,
      middlewares: this._middlewares,
      controller: this._controller,
    }
  }
}

export interface RestServerService {
  configure(config: RestServerConfig): void
  addRoute(routes: RestRoute | RestRoute[]): void
  start(): void
}

export const RestServerServiceSymbol = Symbol.for('RestServerService');

export { RestRoute as route };