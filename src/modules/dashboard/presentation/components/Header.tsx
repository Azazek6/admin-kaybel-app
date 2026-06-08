import { Bell } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="flex flex-row justify-end border-b p-4 px-6 border-gray-300">
      <Bell className="text-gray-500" size={20} />
    </div>
  );
};

export default Header;
