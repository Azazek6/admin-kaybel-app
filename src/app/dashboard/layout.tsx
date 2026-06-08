import DashboardLayout from "@/shared/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dahsboard | Kaybel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
