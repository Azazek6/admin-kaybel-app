"use client";
import React from "react";
import BarProgressProvider from "./BarProgressProvider";
import { Toaster } from "sonner";

const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <BarProgressProvider>
      <Toaster position="top-right" richColors closeButton />
      {children}
    </BarProgressProvider>
  );
};

export default AppProvider;
