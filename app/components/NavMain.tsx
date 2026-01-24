"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/app/components/ui/sidebar";
import { IconSquarePlus, IconCirclePlus, IconSettings } from "@tabler/icons-react";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarGroupLabel>General</SidebarGroupLabel>
        <SidebarMenu>
          
          <SidebarMenuItem >
            <SidebarMenuButton >
              <IconCirclePlus/>
              <span>Set Income</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton >
              <IconCirclePlus/>
              <span>Add Subscription</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton >
              <IconCirclePlus/>
              <span>Add Purchase</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton >
              <IconSquarePlus/>
              <span>Add Debt</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
        <SidebarGroupLabel>More</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton >
                <IconSettings/>
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
