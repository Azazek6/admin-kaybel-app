import { Signin } from "./auth.type";

export interface IAuthRepository {
  signin(d: Signin): Promise<{ token: string, requiresTwoFactor: boolean, expiresIn: string }>
  logout(): Promise<void>;
}