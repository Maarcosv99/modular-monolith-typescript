import { container } from 'tsyringe';

import { route } from '@modules/shared/http/rest/rest';
import { ValidatorMiddleware } from '@modules/shared/infrastructure/rest/express/express-validator-middleware';

import { RegisterUserController } from './controller/register-user.controller';
import { registerUserRequestSchema } from './validator/request/register-user-request.schema';

import { SignInController } from './controller/sign-in.controller';
import { signInRequestSchema } from './validator/request/sign-in-request.schema';

import { RefreshController } from './controller/refresh.controller';
import { refreshTokenRequestSchema } from './validator/request/refresh-token-request.schema';

import { LogoutController } from './controller/logout.controller';

export const registerUserRoute = route.post('/register')
  .middlewares(new ValidatorMiddleware('body', registerUserRequestSchema))
  .controller(container.resolve(RegisterUserController));

export const signInRoute = route.post('/sign-in')
  .middlewares(new ValidatorMiddleware('body', signInRequestSchema))
  .controller(container.resolve(SignInController));

export const refreshTokenRoute = route.post('/refresh')
  .middlewares(new ValidatorMiddleware('body', refreshTokenRequestSchema))
  .controller(container.resolve(RefreshController));

export const logOutRoute = route.delete('/logout')
  .controller(container.resolve(LogoutController));