import { injectable, inject } from 'tsyringe';

import type { RestMiddleware, HttpRequest, HttpResponse } from '@modules/shared/http/rest/rest';
import { HttpStatus } from '@modules/shared/http/rest/rest';

import { isFailure } from '@modules/shared/core/result';

import { JwtServiceSymbol } from 'src/application/services/jwt/jwt.service';
import type { JwtService } from 'src/application/services/jwt/jwt.service';

@injectable()
export class AuthenticatedMiddleware implements RestMiddleware {
  constructor(
    @inject(JwtServiceSymbol)
    private jwtService: JwtService,
  ) {}

  async handleRequest(request: HttpRequest): Promise<HttpResponse<undefined> | undefined> {
    const accessToken = request.headers['authorization'] || request.headers['Authorization'];
    
    if (!accessToken) {
      return {
        status: HttpStatus.unAuthorizedRequest
      }
    }

    const decodedToken = await this.jwtService.verify('access', accessToken);
    if (isFailure(decodedToken)) {
      return {
        status: HttpStatus.unAuthorizedRequest
      }
    }
  }
}