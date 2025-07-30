import { injectable, inject } from 'tsyringe';

import type { RestController, HttpRequest, HttpResponse } from '@modules/shared/http/rest/rest';
import { HttpStatus } from '@modules/shared/http/rest/rest';

import { isFailure } from '@modules/shared/core/result';

import { RefreshTokenUseCase, RefreshTokenUseCaseSymbol } from 'application/usecases/refresh-token.usecase';

import type { RefreshTokenRequestDto } from '../dto/request/refresh-token-request.dto';

@injectable()
export class RefreshController implements RestController {
  constructor(
    @inject(RefreshTokenUseCaseSymbol)
    private refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async handleRequest(request: HttpRequest): Promise<HttpResponse<{ accessToken: string } | { error: string }>> {
    const { refreshToken } = request.body as RefreshTokenRequestDto;

    const refreshTokenOrError = await this.refreshTokenUseCase.execute(refreshToken);
    if (isFailure(refreshTokenOrError)) {
      return {
        status: HttpStatus.badRequest,
        body: { error: refreshTokenOrError.error.message },
      };
    }

    return {
      status: HttpStatus.successRequest,
      body:refreshTokenOrError.value,
    };
  }
}