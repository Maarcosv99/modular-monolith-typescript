import { route } from 'modules/shared/src/http/rest/rest';

import { DrizzleDatabaseService } from 'modules/shared/src/infrastructure/database/drizzle-database/drizzle-database.service';

import { UserRepositoryDatabase } from 'application/repositories/user-repository-database';
import { PasswordHasherService } from 'application/services/hashing/password-hasher.service';

import { RegisterUserUseCase } from 'application/usecases/register-user.usecase';
import { registerUserRequestSchema } from 'http/rest/validator/request/register-user-request.schema';
import { RegisterUserController } from 'http/rest/controller/register-user.controller';

import { ValidatorMiddleware } from 'modules/shared/src/infrastructure/rest/express/express-validator-middleware';

const databaseService = new DrizzleDatabaseService();

const registerUserRoute = route.post('/user/register')
  .middlewares(new ValidatorMiddleware('body', registerUserRequestSchema))
  .controller(new RegisterUserController(
    new RegisterUserUseCase(
      new UserRepositoryDatabase(databaseService),
      new PasswordHasherService()
    )
  ));

const routes = [registerUserRoute];

export { routes };