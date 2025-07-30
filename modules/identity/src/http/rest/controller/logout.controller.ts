import { injectable, inject } from 'tsyringe';

import type { RestController, HttpRequest, HttpResponse } from '@modules/shared/http/rest/rest';
import { HttpStatus } from '@modules/shared/http/rest/rest';

import { isFailure } from '@modules/shared/core/result';

import { LogOutUseCase, LogOutUseCaseSymbol } from 'src/application/usecases/logout.usecase';

@injectable()
export class LogoutController implements RestController {
  constructor(
    @inject(LogOutUseCaseSymbol)
    private logOutUseCase: LogOutUseCase,
  ) {}

  async handleRequest(request: HttpRequest): Promise<HttpResponse<undefined | { error: string }>> {
    const refreshToken = request.headers['x-refresh-token'];

    if (!refreshToken) {
      return {
        status: HttpStatus.unAuthorizedRequest
      }
    }

    const logOutOrError = await this.logOutUseCase.execute(refreshToken);
    if (isFailure(logOutOrError)) {
      return {
        status: HttpStatus.forbiddenRequest,
        body: { error: logOutOrError.error.message }
      }
    }

    return {
      status: HttpStatus.successRequest,
    }
  }
}