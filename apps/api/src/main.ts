import 'reflect-metadata';

import { ExpressServerService } from '@modules/shared/infrastructure/rest/express/express.service';

import IdentityModule from '@modules/identity/module';

const rest = new ExpressServerService();
rest.configure({
  port: 3000,
  basePath: '/api/v1',
});

rest.addModuleRoutes('/identity', IdentityModule.routes);

rest.start();