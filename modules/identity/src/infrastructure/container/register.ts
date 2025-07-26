import { container } from 'tsyringe';

import type { Database } from '@modules/shared/application/service/database.interface';
import { DatabaseSymbol } from '@modules/shared/application/service/database.interface';

import type { UserRepository } from 'core/repositories/user.repository';
import { UserRepositorySymbol } from 'core/repositories/user.repository';

import { PasswordHasherService } from 'application/services/hashing/password-hasher.service';
import { PasswordHasherServiceSymbol } from 'application/services/hashing/password-hasher.service';

import { DrizzleDatabaseService } from '@modules/shared/infrastructure/database/drizzle-database/drizzle-database.service';
import { UserRepositoryDatabase } from 'application/repositories/user-repository-database';

import { RegisterUserUseCase } from 'application/usecases/register-user.usecase';
import { RegisterUserUseCaseSymbol } from 'application/usecases/register-user.usecase';

import { ExpressServerService } from '@modules/shared/infrastructure/rest/express/express.service';
import { RestServerService } from '@modules/shared/http/rest/rest';
import { RestServerServiceSymbol } from '@modules/shared/http/rest/rest'

container.registerSingleton<Database>(DatabaseSymbol, DrizzleDatabaseService);
container.registerSingleton<UserRepository>(UserRepositorySymbol, UserRepositoryDatabase);
container.registerSingleton<PasswordHasherService>(PasswordHasherServiceSymbol, PasswordHasherService);
container.registerSingleton<RegisterUserUseCase>(RegisterUserUseCaseSymbol, RegisterUserUseCase);
container.registerSingleton<RestServerService>(RestServerServiceSymbol, ExpressServerService);
