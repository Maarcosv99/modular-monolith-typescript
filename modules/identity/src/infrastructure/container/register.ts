import { container } from 'tsyringe';

import type { Database } from '@modules/shared/application/service/database.interface';
import { DatabaseSymbol } from '@modules/shared/application/service/database.interface';
import { DrizzleDatabaseService } from '@modules/shared/infrastructure/database/drizzle-database/drizzle-database.service';

import { envConfig, ConfigEnvSymbol } from '@modules/shared/config/env';
import type { ConfigEnv } from '@modules/shared/config/env';

import type { UserRepository } from 'core/repositories/user.repository';
import { UserRepositorySymbol } from 'core/repositories/user.repository';
import { UserRepositoryDatabase } from 'application/repositories/user-repository-database';

import type { PasswordHasherService } from 'application/services/hashing/password-hasher.service';
import { PasswordHasherServiceSymbol } from 'application/services/hashing/password-hasher.service';
import { BcryptPasswordHasherService } from 'infrastructure/hashing/bcrypt-password-hasher.service';

import type { JwtService } from 'application/services/jwt/jwt.service';
import { JwtServiceSymbol } from 'application/services/jwt/jwt.service';
import { JsonWebTokensJwtService } from 'infrastructure/jwt/jsonwebtokens-jwt.service';

import { RegisterUserUseCase, RegisterUserUseCaseSymbol } from 'application/usecases/register-user.usecase';
import { SignInUseCase, SignInUseCaseSymbol } from 'application/usecases/sign-in.usecase';

container.registerInstance<ConfigEnv>(ConfigEnvSymbol, envConfig);
container.registerSingleton<Database>(DatabaseSymbol, DrizzleDatabaseService);
container.registerSingleton<UserRepository>(UserRepositorySymbol, UserRepositoryDatabase);
container.registerSingleton<PasswordHasherService>(PasswordHasherServiceSymbol, BcryptPasswordHasherService);
container.registerSingleton<JwtService>(JwtServiceSymbol, JsonWebTokensJwtService);
container.registerSingleton<RegisterUserUseCase>(RegisterUserUseCaseSymbol, RegisterUserUseCase);
container.registerSingleton<SignInUseCase>(SignInUseCaseSymbol, SignInUseCase);