import { ExpressServerService } from 'modules/shared/src/infrastructure/rest/express/express.service';

import { routes } from './config';

const rest = new ExpressServerService();
rest.configure({
  port: 3000,
  basePath: '/api/v1/identity',
});

rest.addRoute(routes);
rest.start();