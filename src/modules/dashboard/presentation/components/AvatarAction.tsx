import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ChevronsUpDown, User, LogOut } from "lucide-react";

const AvatarAction = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer w-full">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 rounded-md">
              <AvatarFallback className="rounded-md bg-gray-200 text-black font-bold">
                US
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <h3 className="text-sm font-medium text-gray-900">Usuario</h3>
              <p className="text-xs text-gray-500">Rol del usuario</p>
            </div>
          </div>
          <ChevronsUpDown className="size-4 text-gray-500" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56"
        align="end"
        side="right"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex items-center gap-3">
            <Avatar className="size-8 rounded-md">
              <AvatarFallback className="rounded-md bg-gray-200 text-black text-xs font-bold">
                US
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <h3 className="text-sm font-medium leading-none">Usuario</h3>
              <p className="text-xs text-gray-500 mt-1">usuario@ejemplo.com</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2">
          <User className="size-4 text-gray-500" />
          <span className="font-medium">Mi cuenta</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer flex items-center gap-2 py-2 text-red-600 focus:text-red-600 focus:bg-red-50">
          <LogOut className="size-4" />
          <span className="font-medium">Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarAction;
