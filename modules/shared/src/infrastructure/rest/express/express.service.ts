import { injectable, registry } from 'tsyringe';

import type {
  RestServerService,
  RestServerConfig,
} from 'http/rest/rest';
import { RestRoute, RestServerServiceSymbol } from 'http/rest/rest';

import { expressRouteAdapter } from './express-route-adapter';
import { expressMiddlewareAdapter } from './express-middleware-adapter';

import express from 'express';

@injectable()
@registry([{
  token: RestServerServiceSymbol,
  useClass: ExpressServerService,
}])
export class ExpressServerService implements RestServerService {
  private app: express.Application;

  private config: RestServerConfig = {
    port: 3000,
    basePath: '',
    middlewares: []
  };

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  configure(config: RestServerConfig): ExpressServerService {
    this.config = config;
    return this;
  }

  addRoute(route: RestRoute | RestRoute[]): void {
    const routes = Array.isArray(route) ? route : [route];

    routes.forEach((route) => {
      const path = this.config.basePath + route.routeData.path;

      route.routeData.middlewares.forEach((middleware) => {
        this.app.use(
          this.config.basePath + route.routeData.path,
          expressMiddlewareAdapter(middleware)
        );
      });

      if (route.routeData.controller) {
        const adaptedController = expressRouteAdapter(route.routeData.controller);
        if (Array.isArray(route.routeData.method)) {
          route.routeData.method.forEach((method) => {
            this.app[method](path, adaptedController);
          });
        } else {
          this.app[route.routeData.method](path, adaptedController);
        }
      }
    });
  }

  start(): void {
    this.app.listen(this.config.port, () => {
      console.log(`Server is running on port ${this.config.port}`);
    });
  }
}

