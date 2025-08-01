import { injectable, inject } from 'tsyringe';

import type { RestController, HttpRequest, HttpResponse } from '@modules/shared/http/rest/rest';
import { HttpStatus } from '@modules/shared/http/rest/rest';

import { isFailure } from '@modules/shared/core/result';

import { RegisterUserUseCase } from 'application/usecases/register-user.usecase';
import { RegisterUserUseCaseSymbol } from 'application/usecases/register-user.usecase';

import type { RegisterUserRequestDto } from 'http/rest/dto/request/register-user-request.dto';

import { EmailAlreadyUsedException } from 'core/exceptions/email-already-used.exception';
import { InvalidEmailException } from 'core/exceptions/invalid-email.exception';
import { HashingException } from 'application/exceptions/hashing-error.exception';
import { PasswordMaxLengthException } from 'src/core/exceptions/password-max-length.exception';
import { UserAlreadyExistsException } from 'src/core/exceptions/user-already-exists.exception';

@injectable()
export class RegisterUserController implements RestController {
  constructor(
    @inject(RegisterUserUseCaseSymbol)
    private readonly registerUserUseCase: RegisterUserUseCase
  ) {}

  async handleRequest(request: HttpRequest): Promise<HttpResponse<unknown>> {
    const { first_name, last_name, email, password } = request.body as RegisterUserRequestDto;

    const result = await this.registerUserUseCase.execute({ first_name, last_name, email, password });

    if (isFailure(result)) {
      if (result.error instanceof EmailAlreadyUsedException) {
        return {
          status: HttpStatus.badRequest,
          body: { error: result.error.message }
        }
      }

      if (result.error instanceof InvalidEmailException) {
        return {
          status: HttpStatus.badRequest,
          body: { error: result.error.message }
        }
      }

      if (result.error instanceof HashingException) {
        return {
          status: HttpStatus.internalServerErrorRequest,
          body: { error: result.error.message }
        }
      }

      if (result.error instanceof PasswordMaxLengthException) {
        return {
          status: HttpStatus.badRequest,
          body: { error: result.error.message }
        }
      }
      
      if (result.error instanceof UserAlreadyExistsException) {
        return {
          status: HttpStatus.badRequest,
          body: { error: result.error.message }
        }
      }


      return {
        status: HttpStatus.internalServerErrorRequest,
        body: { error: 'Internal server error' }
      }
    }

    return { status: HttpStatus.createdRequest };
  }
}