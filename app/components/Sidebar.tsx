"use client"

import { NavMain } from "@/app/components/NavMain";
import { NavUser } from "@/app/components/NavUser";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/app/components/ui/sidebar";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <h1 className="text-6xl font-bold text-[rgb(var(--primary))]">Themis</h1>     
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

