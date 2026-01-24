"use client"

import * as React from "react";
import { NavMain } from "@/app/components/NavMain";
import { NavUser } from "@/app/components/NavUser";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/app/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <h1 className="text-base font-semibold">Themis</h1>     
      </SidebarHeader>
      <SidebarContent>
        <NavMain/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}
