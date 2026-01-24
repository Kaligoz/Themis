"use client"

import { ModeToggle } from "@/app/components/ModeToggle";
import { LanguageToggle } from "@/app/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { AppSidebar } from "@/app/components/Sidebar";
import { SiteHeader } from "@/app/components/Header";
import { SidebarInset, SidebarProvider } from "@/app/components/ui/sidebar";

export default function Home() {
  const { t } = useTranslation("common")

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
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <ModeToggle/>
                  <LanguageToggle/>
                  <h1>{t("appName")}</h1>
                  <p>{t("description")}</p>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}
