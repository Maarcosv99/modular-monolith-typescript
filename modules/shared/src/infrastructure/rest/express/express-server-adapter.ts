import type { RestController, RestControllerConfig } from 'http/rest/rest';
import type { Application, Router } from 'express';
import type { Server } from 'http';

import constants from 'core/constants';
import { setupRoutes } from './express-setup-routes';

export class ExpressServerAdapter {
  private readonly controllers: RestControllerConfig<Router>[] = [];

  constructor(
    private readonly serverPort: number,
    private readonly expressApp: Application,
    private readonly server: Server
  ) {}

  public async start(): Promise<void> {
    await setupRoutes(this.expressApp, this.controllers);
  }
}