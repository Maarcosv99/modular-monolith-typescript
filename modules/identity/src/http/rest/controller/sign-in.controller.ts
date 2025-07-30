import { injectable, inject } from 'tsyringe';

import type { RestController, HttpRequest, HttpResponse } from '@modules/shared/http/rest/rest';
import { HttpStatus } from '@modules/shared/http/rest/rest';

import { isFailure } from '@modules/shared/core/result';

import type { SignInRequestDto } from '../dto/request/sign-in-request.dto';

import type { SignInUseCase } from 'application/usecases/sign-in.usecase';
import { SignInUseCaseSymbol } from 'application/usecases/sign-in.usecase';

import { SessionAlreadyExistsException } from 'core/exceptions/session-already-exists.exception';
import { SessionNotFoundException } from 'core/exceptions/session-not-found.exception';
import { UserNotFoundException } from 'src/core/exceptions/user-not-found.exception';
import { PasswordNotMatchingException } from 'src/application/exceptions/password-not-matching.exception';
import { JwtException } from 'src/application/exceptions/jwt-error.exception';

@injectable()
export class SignInController implements RestController {
  constructor(
    @inject(SignInUseCaseSymbol)
    private readonly signInUseCase: SignInUseCase,
  ) {}

  async handleRequest(request: HttpRequest): Promise<HttpResponse<{ accessToken: string, refreshToken: string } | { error: string }>> {
    const { email, password } = request.body as SignInRequestDto;

    const signInOrError = await this.signInUseCase.execute({ email, password });
    if (isFailure(signInOrError)) {
      if (signInOrError.error instanceof UserNotFoundException) {
        return {
          status: HttpStatus.notFoundRequest,
          body: { error: signInOrError.error.message }
        }
      }

      if (signInOrError.error instanceof PasswordNotMatchingException) {
        return {
          status: HttpStatus.badRequest,
          body: { error: signInOrError.error.message }
        }
      }

      if (signInOrError.error instanceof PasswordNotMatchingException) {
        return {
          status: HttpStatus.badRequest,
          body: { error: signInOrError.error.message }
        }
      }

      if (signInOrError.error instanceof SessionAlreadyExistsException) {
        return {
          status: HttpStatus.badRequest,
          body: { error: signInOrError.error.message }
        }
      }

      if (signInOrError.error instanceof SessionNotFoundException) {
        return {
          status: HttpStatus.badRequest,
          body: { error: signInOrError.error.message }
        }
      }

      if (signInOrError.error instanceof JwtException) {
        return {
          status: HttpStatus.badRequest,
          body: { error: signInOrError.error.message }
        }
      }

      return {
        status: HttpStatus.internalServerErrorRequest,
        body: { error: 'An unexpected error occurred' }
      }
    }

    return {
      status: HttpStatus.successRequest,
      body: {
        accessToken: signInOrError.value.accessToken,
        refreshToken: signInOrError.value.refreshToken,
      },
    }
  }
}