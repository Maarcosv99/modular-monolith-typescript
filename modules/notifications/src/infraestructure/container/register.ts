import { container } from 'tsyringe';

import { envConfig, ConfigEnvSymbol } from '@modules/shared/config/env';
import type { ConfigEnv } from '@modules/shared/config/env';

container.registerInstance<ConfigEnv>(ConfigEnvSymbol, envConfig);
