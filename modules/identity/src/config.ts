import { container } from 'tsyringe';

import { route } from '@modules/shared/http/rest/rest';
import { ValidatorMiddleware } from '@modules/shared/infrastructure/rest/express/express-validator-middleware';

import { RegisterUserController } from './http/rest/controller/register-user.controller';
import { registerUserRequestSchema } from './http/rest/validator/request/register-user-request.schema';

const registerUserRoute = route.post('/register')
  .middlewares(
    new ValidatorMiddleware('body', registerUserRequestSchema)
  )
  .controller(container.resolve(RegisterUserController));

export const routes = [
  registerUserRoute
]; 
