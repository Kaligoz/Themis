"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/app/components/ui/sidebar";
import { IconSquarePlus, IconCirclePlus, IconSettings } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

type ModalType = "income" | "addSubscription" | "addPurchase" | "addDebt" | "settings" | "editSubscription" | "editPurchase" | "editDebt" |  null;

interface NavMainProps {
  onAction: (type: ModalType) => void;
}

export function NavMain({ onAction }: NavMainProps) {

  const { t } = useTranslation("common")

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarGroupLabel className="text-lg">{t("general")}</SidebarGroupLabel>
        <SidebarMenu>
          
          <SidebarMenuItem >
            <SidebarMenuButton onClick={() => onAction("income")}>
              <IconSquarePlus />
              <span>{t("incomeBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton >
              <IconCirclePlus/>
              <span>{t("addSubBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton >
              <IconCirclePlus/>
              <span>{t("addPurBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton >
              <IconCirclePlus/>
              <span>{t("addDebtBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
        <SidebarGroupLabel className="text-lg">{t("more")}</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => onAction("settings")}>
                <IconSettings/>
                <span>{t("settings")}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
