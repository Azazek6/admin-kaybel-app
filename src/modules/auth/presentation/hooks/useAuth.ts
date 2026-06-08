import { useState } from "react";
import { authService } from "../../infrastructure/services/auth.service";
import { Signin } from "../../domain/auth.type";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginLocal = async (request: Signin) => {
    try {
      return await authService.signin(request);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      return await authService.logout();
    } catch (error) {
      window.location.href = "/logout";
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginLocal,
    logout,
    isLoading,
    setIsLoading,
  };
};
