"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      // icon: (
      //   <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      // ),
    },
    {
      label: "Profile",
      href: "#",
      // icon: (
      //   <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      // ),
    },
    {
      label: "Settings",
      href: "#",
      // icon: (
      //   <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      // ),
    },
    {
      label: "Logout",
      href: "#",
      // icon: (
      //   <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      // ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full min-w-[280px] flex-1 flex-col overflow-hidden  border-r border-neutral-200 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10 bg-white">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <>My Logo</>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="/file.svg"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
