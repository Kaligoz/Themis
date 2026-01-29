import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { SidebarTrigger } from "@/app/components/ui/sidebar";
import { authClient } from "../lib/auth-client";
import { useTranslation } from "react-i18next";
import { IconFileExport } from "@tabler/icons-react";

export function SiteHeader() {

  const { t } = useTranslation("common")

  const { data: session } = authClient.useSession()

  if (!session) return null

  const { user } = session

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{t("welcome")}, {user.name}!</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="border-2 bg-[rgb(var(--secondary))] sm:flex">
            <a
              href="#"
            >
              <IconFileExport/>
              {t("exportData")}
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
