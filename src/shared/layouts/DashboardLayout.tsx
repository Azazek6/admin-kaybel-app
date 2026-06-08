import React from "react";
import Sidebar from "../../modules/dashboard/presentation/components/Sidebar";
import Header from "../../modules/dashboard/presentation/components/Header";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full flex h-dvh bg-[#F9F9F9]">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <main className="px-6 py-5">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
