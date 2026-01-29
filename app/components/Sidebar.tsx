"use client"

import * as React from "react";
import { NavMain } from "@/app/components/NavMain";
import { NavUser } from "@/app/components/NavUser";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/app/components/ui/sidebar";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onAction: (type: "income" | "addSubscription" | "addPurchase" | "addDebt" | "settings" | "editSubscription" | "editPurchase" | "editDebt" |  null) => void;
}

export function AppSidebar({ onAction, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <h1 className="text-6xl font-bold text-[rgb(var(--primary))]">Themis</h1>     
      </SidebarHeader>
      <SidebarContent>
        <NavMain onAction={onAction}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  )
}

