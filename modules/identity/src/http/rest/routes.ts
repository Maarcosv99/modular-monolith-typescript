import { container } from 'tsyringe';

import { route } from '@modules/shared/http/rest/rest';
import { ValidatorMiddleware } from '@modules/shared/infrastructure/rest/express/express-validator-middleware';

import { RegisterUserController } from './controller/register-user.controller';
import { registerUserRequestSchema } from './validator/request/register-user-request.schema';

import { SignInController } from './controller/sign-in.controller';
import { signInRequestSchema } from './validator/request/sign-in-request.schema';

import { RefreshController } from './controller/refresh.controller';

import { LogoutController } from './controller/logout.controller';
import { AuthenticatedMiddleware } from './middlewares/authenticated.middleware';

import { GetUserController } from './controller/get-user.controller';

export const registerUserRoute = route.post('/register')
  .middlewares(new ValidatorMiddleware('body', registerUserRequestSchema))
  .controller(container.resolve(RegisterUserController));

export const signInRoute = route.post('/sign-in')
  .middlewares(new ValidatorMiddleware('body', signInRequestSchema))
  .controller(container.resolve(SignInController));

export const refreshTokenRoute = route.post('/refresh')
  .controller(container.resolve(RefreshController));

export const logOutRoute = route.delete('/logout')
  .middlewares(container.resolve(AuthenticatedMiddleware))
  .controller(container.resolve(LogoutController));

export const getUserRoute = route.get('/me')
  .middlewares(container.resolve(AuthenticatedMiddleware))
  .controller(container.resolve(GetUserController));