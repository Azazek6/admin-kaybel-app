import apiClient from "@/shared/infrastructure/http/client";
import { IAuthRepository } from "../../domain/auth.repository.interface";
import { Signin } from "../../domain/auth.type";

export class AuthRepository implements IAuthRepository {
  async signin(
    d: Signin,
  ): Promise<{ token: string; requiresTwoFactor: boolean; expiresIn: string }> {
    const response = await apiClient.post<{
      token: string;
      requiresTwoFactor: boolean;
      expiresIn: string;
    }>("/auth/login/local", d);
    return response.data;
  }

  async logout(): Promise<void> {
    const response = await apiClient.post<void>("/auth/logout");
    return response.data;
  }
}

export const authRepository = new AuthRepository();
