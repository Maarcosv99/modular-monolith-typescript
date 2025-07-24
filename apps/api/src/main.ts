import { routes as identityRoutes } from '@modules/identity/config';
import { ExpressServerService } from '@modules/shared/infrastructure/rest/express/express.service';

const rest = new ExpressServerService();
rest.configure({
  port: 3000,
  basePath: '/api/v1',
});

rest.addRoutes('/identity', identityRoutes);

rest.start();