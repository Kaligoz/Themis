"use client"

import { AppSidebar } from "@/app/components/Sidebar";
import { SiteHeader } from "@/app/components/Header";
import { SidebarInset, SidebarProvider } from "@/app/components/ui/sidebar";
import { SetIncomeModal } from "./components/modals/SetIncomeModal";
import { SettingsModal } from "./components/modals/SettingsModal";
import { useState } from "react";

type ModalType = "income" | "addSubscription" | "addPurchase" | "addDebt" | "settings" | "editSubscription" | "editPurchase" | "editDebt" |  null;

export default function Home() {

  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const closeModal = () => setActiveModal(null)

  return (
    <main>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      > 
        <AppSidebar variant="inset" onAction={(type: ModalType) => setActiveModal(type)}/>
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  
              </div>
            </div>
          </div>
        </SidebarInset>

        <SetIncomeModal isOpen={activeModal === "income"} setIsOpen={closeModal}/>

        <SettingsModal isOpen={activeModal === "settings"} setIsOpen={closeModal}/>

      </SidebarProvider>
    </main>
  )
};
