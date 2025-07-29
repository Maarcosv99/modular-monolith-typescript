// export the module
import 'reflect-metadata';
import 'infrastructure/container/register';
import * as routes from './http/rest/routes';

import type { IModule } from '@modules/shared/module';

const identityModule: IModule = {
  routes: Object.values(routes),
};

export default identityModule;