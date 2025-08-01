import { container } from 'tsyringe';

import '@modules/shared/infrastructure/container/register';
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

import type { TokenManagerService } from 'application/services/token-manager/token-manager.service';
import { TokenManagerServiceSymbol } from 'application/services/token-manager/token-manager.service';
import { RedisTokenManagerService } from 'infrastructure/token-manager/redis-token-manager.service';

import { RegisterUserUseCase, RegisterUserUseCaseSymbol } from 'application/usecases/register-user.usecase';
import { SignInUseCase, SignInUseCaseSymbol } from 'application/usecases/sign-in.usecase';
import { LogOutUseCase, LogOutUseCaseSymbol } from 'application/usecases/logout.usecase';
import { RefreshTokenUseCase, RefreshTokenUseCaseSymbol } from 'application/usecases/refresh-token.usecase';
import { GetUserByAccessTokenUseCase, GetUserByAccessTokenUseCaseSymbol } from 'application/usecases/get-user-by-access-token.usecase';

container.registerInstance<ConfigEnv>(ConfigEnvSymbol, envConfig);
container.registerSingleton<UserRepository>(UserRepositorySymbol, UserRepositoryDatabase);
container.registerSingleton<PasswordHasherService>(PasswordHasherServiceSymbol, BcryptPasswordHasherService);
container.registerSingleton<JwtService>(JwtServiceSymbol, JsonWebTokensJwtService);
container.registerSingleton<TokenManagerService>(TokenManagerServiceSymbol, RedisTokenManagerService);
container.registerSingleton<RegisterUserUseCase>(RegisterUserUseCaseSymbol, RegisterUserUseCase);
container.registerSingleton<SignInUseCase>(SignInUseCaseSymbol, SignInUseCase);
container.registerSingleton<LogOutUseCase>(LogOutUseCaseSymbol, LogOutUseCase);
container.registerSingleton<RefreshTokenUseCase>(RefreshTokenUseCaseSymbol, RefreshTokenUseCase);
container.registerSingleton<GetUserByAccessTokenUseCase>(GetUserByAccessTokenUseCaseSymbol, GetUserByAccessTokenUseCase);
