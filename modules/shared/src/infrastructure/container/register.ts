import { container } from 'tsyringe';

import type { Database } from '@modules/shared/application/service/database.interface';
import { DatabaseSymbol } from '@modules/shared/application/service/database.interface';
import { DrizzleDatabaseService } from '@modules/shared/infrastructure/database/drizzle-database/drizzle-database.service';

import type { Cache } from '@modules/shared/application/service/cache.interface';
import { CacheSymbol } from '@modules/shared/application/service/cache.interface';
import { IORedisCache } from '@modules/shared/infrastructure/cache/ioredis/ioredis.service';
import { Queue, QueueSymbol } from '@/application/service/queue.interface';
import { KafkaService } from '../queue/kafka.service';

container.registerSingleton<Database>(DatabaseSymbol, DrizzleDatabaseService);
container.registerSingleton<Cache>(CacheSymbol, IORedisCache);
container.registerSingleton<Queue>(QueueSymbol, KafkaService);
