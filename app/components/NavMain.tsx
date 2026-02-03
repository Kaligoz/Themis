"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/app/components/ui/sidebar";
import { IconSquarePlus, IconCirclePlus, IconSettings } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { SettingsModal } from "./modals/SettingsModal";
import { useState } from "react";
import { SetIncomeModal } from "./modals/SetIncomeModal";
import { AddSubscriptionModal } from "./modals/AddSubscriptionModal";
import { AddPurchaseModal } from "./modals/AddPurchaseModal";
import { AddDebtModal } from "./modals/AddDebtModal";

type ModalType = "income" | "addSubscription" | "addPurchase" | "addDebt" | "settings" |  null;

export function NavMain() {

  const { t } = useTranslation("common")

  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const closeModal = () => setActiveModal(null)

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarGroupLabel className="text-lg">{t("general")}</SidebarGroupLabel>
        <SidebarMenu>
          
          <SidebarMenuItem >
            <SidebarMenuButton onClick={() => setActiveModal("income")}>
              <IconSquarePlus />
              <span>{t("incomeBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton onClick={() => setActiveModal("addSubscription")}>
              <IconCirclePlus/>
              <span>{t("addSubBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton onClick={() => setActiveModal("addPurchase")}>
              <IconCirclePlus/>
              <span>{t("addPurBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton onClick={() => setActiveModal("addDebt")}>
              <IconCirclePlus/>
              <span>{t("addDebtBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
        <SidebarGroupLabel className="text-lg">{t("more")}</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setActiveModal("settings")}>
                <IconSettings/>
                <span>{t("settings")}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>

      <SettingsModal isOpen={activeModal === "settings"} setIsOpen={closeModal}/>
      <SetIncomeModal isOpen={activeModal === "income"} setIsOpen={closeModal}/>

      <AddSubscriptionModal isOpen={activeModal === "addSubscription"} setIsOpen={closeModal}/>
      <AddPurchaseModal isOpen={activeModal === "addPurchase"} setIsOpen={closeModal}/>
      <AddDebtModal isOpen={activeModal === "addDebt"} setIsOpen={closeModal}/>
      
    </SidebarGroup>
  )
}
