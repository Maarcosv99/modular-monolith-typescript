import { container } from 'tsyringe';

import { envConfig, ConfigEnvSymbol } from '@modules/shared/config/env';
import type { ConfigEnv } from '@modules/shared/config/env';

import type { Database } from '@modules/shared/application/service/database.interface';
import { DatabaseSymbol } from '@modules/shared/application/service/database.interface';
import { DrizzleDatabaseService } from '@modules/shared/infrastructure/database/drizzle-database/drizzle-database.service';

import type { Cache } from '@modules/shared/application/service/cache.interface';
import { CacheSymbol } from '@modules/shared/application/service/cache.interface';
import { IORedisCache } from '@modules/shared/infrastructure/cache/ioredis/ioredis.service';

import type { UserRepository } from 'core/repositories/user.repository';
import { UserRepositorySymbol } from 'core/repositories/user.repository';
import { UserRepositoryDatabase } from 'application/repositories/user-repository-database';

import type { PasswordHasherService } from 'application/services/hashing/password-hasher.service';
import { PasswordHasherServiceSymbol } from 'application/services/hashing/password-hasher.service';
import { BcryptPasswordHasherService } from 'infrastructure/hashing/bcrypt-password-hasher.service';

import type { JwtService } from 'application/services/jwt/jwt.service';
import { JwtServiceSymbol } from 'application/services/jwt/jwt.service';
import { JsonWebTokensJwtService } from 'infrastructure/jwt/jsonwebtokens-jwt.service';

import type { TokenManagerService } from 'application/services/token-manager/token-manager.service';
import { TokenManagerServiceSymbol } from 'application/services/token-manager/token-manager.service';
import { RedisTokenManagerService } from 'infrastructure/token-manager/redis-token-manager.service';

import { RegisterUserUseCase, RegisterUserUseCaseSymbol } from 'application/usecases/register-user.usecase';
import { SignInUseCase, SignInUseCaseSymbol } from 'application/usecases/sign-in.usecase';
import { LogOutUseCase, LogOutUseCaseSymbol } from 'application/usecases/logout.usecase';
import { RefreshTokenUseCase, RefreshTokenUseCaseSymbol } from 'application/usecases/refresh-token.usecase';

container.registerInstance<ConfigEnv>(ConfigEnvSymbol, envConfig);
container.registerSingleton<Database>(DatabaseSymbol, DrizzleDatabaseService);
container.registerSingleton<Cache>(CacheSymbol, IORedisCache);
container.registerSingleton<UserRepository>(UserRepositorySymbol, UserRepositoryDatabase);
container.registerSingleton<PasswordHasherService>(PasswordHasherServiceSymbol, BcryptPasswordHasherService);
container.registerSingleton<JwtService>(JwtServiceSymbol, JsonWebTokensJwtService);
container.registerSingleton<TokenManagerService>(TokenManagerServiceSymbol, RedisTokenManagerService);
container.registerSingleton<RegisterUserUseCase>(RegisterUserUseCaseSymbol, RegisterUserUseCase);
container.registerSingleton<SignInUseCase>(SignInUseCaseSymbol, SignInUseCase);
container.registerSingleton<LogOutUseCase>(LogOutUseCaseSymbol, LogOutUseCase);
container.registerSingleton<RefreshTokenUseCase>(RefreshTokenUseCaseSymbol, RefreshTokenUseCase);