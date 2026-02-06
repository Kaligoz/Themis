"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/app/components/ui/sidebar";
import { IconSquarePlus, IconCirclePlus, IconSettings } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { SettingsModal } from "./modals/SettingsModal";
import { useState, useEffect } from "react";
import { SetIncomeModal } from "./modals/SetIncomeModal";
import { AddSubscriptionModal } from "./modals/AddSubscriptionModal";
import { AddPurchaseModal } from "./modals/AddPurchaseModal";
import { AddDebtModal } from "./modals/AddDebtModal";

type ModalType = "income" | "addSubscription" | "addPurchase" | "addDebt" | "settings" |  null;

export function NavMain() {

  const { t } = useTranslation("common")

  const [categories, setCategories] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const closeModal = () => setActiveModal(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (err) {
        console.error("Failed to load categories", err)
      }
    };

    fetchCategories()
  }, [activeModal])

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarGroupLabel className="text-lg">{t("general")}</SidebarGroupLabel>
        <SidebarMenu>
          
          <SidebarMenuItem >
            <SidebarMenuButton onClick={() => setActiveModal("income")} className="hover:shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.1)] hover:translate-x-1 transition-transform duration-300 hover:bg-[rgb(var(--background))]">
              <IconSquarePlus />
              <span>{t("incomeBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton onClick={() => setActiveModal("addSubscription")} className="hover:shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.1)] hover:translate-x-1 transition-transform duration-300 hover:bg-[rgb(var(--background))]">
              <IconCirclePlus/>
              <span>{t("addSubBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton onClick={() => setActiveModal("addPurchase")} className="hover:shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.1)] hover:translate-x-1 transition-transform duration-300 hover:bg-[rgb(var(--background))]">
              <IconCirclePlus/>
              <span>{t("addPurBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem >
            <SidebarMenuButton onClick={() => setActiveModal("addDebt")} className="hover:shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.1)] hover:translate-x-1 transition-transform duration-300 hover:bg-[rgb(var(--background))]">
              <IconCirclePlus/>
              <span>{t("addDebtBtn")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
        <SidebarGroupLabel className="text-lg">{t("more")}</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setActiveModal("settings")} className="hover:shadow-[2px_0px_5px_0px_rgba(0,_0,_0,_0.1)] hover:translate-x-1 transition-transform duration-300 hover:bg-[rgb(var(--background))]">
                <IconSettings/>
                <span>{t("settings")}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>

      <SettingsModal isOpen={activeModal === "settings"} setIsOpen={closeModal}/>
      <SetIncomeModal isOpen={activeModal === "income"} setIsOpen={closeModal}/>

      <AddSubscriptionModal isOpen={activeModal === "addSubscription"} setIsOpen={closeModal} existingCategories={categories}/>
      <AddPurchaseModal isOpen={activeModal === "addPurchase"} setIsOpen={closeModal} existingCategories={categories}/>
      <AddDebtModal isOpen={activeModal === "addDebt"} setIsOpen={closeModal} existingCategories={categories}/>
      
    </SidebarGroup>
  )
}
