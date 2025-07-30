import { injectable, inject } from 'tsyringe';

import type { RestController, HttpRequest, HttpResponse } from '@modules/shared/http/rest/rest';
import { HttpStatus } from '@modules/shared/http/rest/rest';

import { isFailure } from '@modules/shared/core/result';

import { GetUserByAccessTokenUseCaseSymbol } from 'application/usecases/get-user-by-access-token.usecase';
import type { GetUserByAccessTokenUseCase } from 'application/usecases/get-user-by-access-token.usecase';

@injectable()
export class GetUserController implements RestController {
  constructor(
    @inject(GetUserByAccessTokenUseCaseSymbol)
    private getUserByAccessTokenUseCase: GetUserByAccessTokenUseCase,
  ) {}

  async handleRequest(request: HttpRequest): Promise<HttpResponse<Record<string, any> | { error: string }>> {
    const accessToken = request.headers['authorization'] || request.headers['Authorization'];

    if (!accessToken) {
      return {
        status: HttpStatus.unAuthorizedRequest
      }
    }

    const userOrError = await this.getUserByAccessTokenUseCase.execute(accessToken);
    if (isFailure(userOrError)) {
      return {
        status: HttpStatus.forbiddenRequest,
        body: { error: userOrError.error.message }
      }
    }

    return {
      status: HttpStatus.successRequest,
      body: userOrError.value,
    }
  }
}