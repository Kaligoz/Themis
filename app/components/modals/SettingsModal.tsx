"use client";

import { authClient } from "@/app/lib/auth-client";
import { LanguageToggle } from "../LanguageToggle";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { IconMoonFilled } from "@tabler/icons-react";
import { CurrencySelect } from "../CurrencySelect";
import { useTranslation } from "react-i18next";

interface SetSettingsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const logout = async() => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/auth"
      }
    }
  })
};

export function SettingsModal({ isOpen, setIsOpen }: SetSettingsProps) {
  
  const { t } = useTranslation("common")

  return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="bg-[rgb(var(--background))]">
    <DialogHeader>
        <DialogTitle>{t("settings")}</DialogTitle>
    </DialogHeader>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <IconMoonFilled/>
          <p className="text-xl">{t("d/l mode")}</p>
        </div>

        <ModeToggle/>

      </div>

      <p className="text-xl">{t("language")}</p>
      <LanguageToggle/>

      <div className="space-y-1">

        <p className="text-xl">{t("currency")}</p>
        <p className="text-base">{t("pick sentance")}</p>
        
      </div>

      <CurrencySelect name="currency" defaultValue="USD"/>
      
      <Button onClick={logout} className="w-full bg-[#E21010] hover:bg-[#960a0a] cursor-pointer text-white">{t("logout")}</Button>
    </DialogContent>
  </Dialog>
  )
}