// export the module
import 'reflect-metadata';
import 'infrastructure/container/register';

import type { IModule } from '@modules/shared/module';

const identityModule: IModule = {
  routes: Object.values(routes),
};

export default identityModule;
