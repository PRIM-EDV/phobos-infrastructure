import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

import * as jose from 'jose';

import { WinstonLogger } from '../logger/index.js';

const PHOBOS_AUTH_URL = process.env.PHOBOS_AUTH_URL ? process.env.PHOBOS_AUTH_URL : 'http://phobos-auth-service';

@Injectable()
export class AuthService {

  private phobosAuthUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly logger: WinstonLogger,
  ) {
    this.logger.setContext(AuthService.name);
    this.phobosAuthUrl = PHOBOS_AUTH_URL;
  }

  /**
   * Validates a JWT token by fetching the public key from the Phobos Auth service and verifying the token.
   * 
   * @param {string} token - The JWT token to validate.
   * @returns {Promise<boolean>} - A promise that resolves to true if the token is valid, false otherwise.
   */
  public async validateToken(token: string): Promise<boolean> {
    try {
      const jwks = await this.fetchCerts();
      const publicKey = await jose.importJWK(jwks[0], "RS256");
      
      await jose.jwtVerify(token, publicKey);

      return true;
    } catch (error) {
      this.logger.warn('Token validation failed:', error);
      return false;
    }
  }

  private async fetchCerts(): Promise<any[]> {
    const url = `${this.phobosAuthUrl}/api/v1/certs`;
    const response = await firstValueFrom(this.http.get<{ keys: any[] }>(url));

    return response.data.keys;
  }
}