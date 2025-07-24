import 'reflect-metadata';
import { container } from 'tsyringe';
import 'infrastructure/container/register';

import type { RestServerService } from '@modules/shared/http/rest/rest';
import { RestServerServiceSymbol } from '@modules/shared/http/rest/rest';

const rest = container.resolve<RestServerService>(RestServerServiceSymbol);
console.log(rest);

rest.configure({
  port: 3000,
  basePath: '/api/v1/identity',
  middlewares: [
    // cors
  ]
});

rest.start();