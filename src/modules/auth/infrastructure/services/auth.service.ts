import { IAuthRepository } from "../../domain/auth.repository.interface";
import { Signin } from "../../domain/auth.type";
import { authRepository } from "../repositories/auth.repository";

export class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async signin(dto: Signin): Promise<{
    token: string;
    requiresTwoFactor: boolean;
    expiresIn: string;
  }> {
    return this.authRepository.signin(dto);
  }

  async logout(): Promise<void> {
    return await this.authRepository.logout();
  }
}

export const authService = new AuthService(authRepository);
