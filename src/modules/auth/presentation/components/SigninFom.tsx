"use client";
import Button from "@/shared/components/custom-ui/button";
import Input from "@/shared/components/custom-ui/input";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import { Spinner } from "@/shared/components/ui/spinner";
import { useRouter } from "@bprogress/next/app";

const SigninFom = () => {
  const { loginLocal, isLoading, setIsLoading } = useAuth();
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    isAdmin: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginLocal(credentials);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Ingresa tu correo"
          value={credentials.email}
          onChange={handleChange}
          className="h-11 bg-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={credentials.password}
          onChange={handleChange}
          className="h-11 bg-white"
        />
      </div>

      <Button
        disabled={isLoading}
        type="submit"
        className="mt-4 h-11 w-full bg-[#590d18] hover:bg-[#420911] text-white font-medium rounded-md transition-all duration-300"
      >
        {isLoading ? <Spinner className="size-4" /> : "Iniciar Sesión"}
      </Button>
    </form>
  );
};

export default SigninFom;
