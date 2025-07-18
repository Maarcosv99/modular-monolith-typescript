import type { RestControllerConfig } from 'http/rest/rest';
import type { Application, Router } from 'express';

export async function setupRoutes(app: Application, controllers: RestControllerConfig<Router>[]): Promise<void> {
  controllers.forEach((controller) => {
    app.use(controller.path, controller.router)
  })
}