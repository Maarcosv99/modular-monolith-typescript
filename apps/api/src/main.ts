import 'reflect-metadata';

import { ExpressServerService } from '@modules/shared/infrastructure/rest/express/express.service';

import IdentityModule from '@modules/identity/module';
import { KafkaService } from '@modules/shared/infrastructure/queue/kafka.service';
import { container } from 'tsyringe';

const rest = new ExpressServerService();
rest.configure({
  port: 3000,
  basePath: '/api/v1',
});

rest.addModuleRoutes('/identity', IdentityModule.routes);


rest.start();
