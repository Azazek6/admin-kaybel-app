import React from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { NAV_ITEMS } from "../consts/sidebar";
import AvatarAction from "./AvatarAction";

const Sidebar = () => {
  return (
    <div className="w-64 flex flex-col h-dvh gap-6 p-4 border-r border-gray-300">
      <div className="flex items-center gap-2 mb-2">
        <Avatar className="size-10 rounded-md">
          <AvatarImage
            src="/images/logo-mini.webp"
            alt="logo-kaybel"
            className="object-cover"
          />
          <AvatarFallback className="rounded-md bg-black text-white font-bold">
            KB
          </AvatarFallback>
        </Avatar>
        <p className="font-semibold text-lg text-gray-800">Kaybel Panel</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="tracking-wider font-semibold uppercase text-[11px] text-gray-500 mb-1 px-2">
          Menú Principal
        </p>

        <Accordion type="multiple" className="w-full space-y-1">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;

            if (item.children) {
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-none"
                >
                  <AccordionTrigger className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 hover:no-underline transition-all text-gray-700 data-[state=open]:text-gray-900 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-gray-500" />
                      <span className="font-medium text-sm">{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-1">
                    <div className="flex flex-col gap-1 pl-11 pr-2">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={`/dashboard${child.href}`}
                          className="flex items-center py-2 px-3 text-sm rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors font-medium no-underline!"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            }

            return (
              <Link
                key={index}
                href={`/dashboard${item.href}` || "#"}
                className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition-all text-gray-700 hover:text-gray-900 font-medium text-sm cursor-pointer no-underline!"
              >
                <Icon className="size-5 text-gray-500" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </Accordion>
      </div>

      <div className="mt-auto">
        <AvatarAction />
      </div>
    </div>
  );
};

export default Sidebar;
