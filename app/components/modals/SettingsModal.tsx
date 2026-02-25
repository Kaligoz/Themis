"use client";

import { authClient } from "@/app/lib/auth-client";
import { LanguageToggle } from "../LanguageToggle";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { IconMoonFilled } from "@tabler/icons-react";
import { CurrencySelect } from "../CurrencySelect";
import { useTranslation } from "react-i18next";
import { updateBaseCurrency } from "@/app/actions/updateUser";

interface SetSettingsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentBaseCurrency?: string;
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

export function SettingsModal({ isOpen, setIsOpen, currentBaseCurrency }: SetSettingsProps) {
  
  const { t } = useTranslation("common")

  async function handleAction(formData: FormData) {
      const result = await updateBaseCurrency(formData)
      if (result.success) {
          setIsOpen(false)
      } else {
          alert(result.error)
      }
  }

  return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="bg-[rgb(var(--background))]">
    <DialogHeader>
        <DialogTitle className="text-xl md:text-2xl">{t("settings")}</DialogTitle>
    </DialogHeader>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <IconMoonFilled/>
          <p className="md:text-xl text-lg">{t("d/l mode")}</p>
        </div>

        <ModeToggle/>

      </div>

      <p className="md:text-xl text-lg">{t("language")}</p>
      <LanguageToggle/>

      <div className="space-y-1">

        <p className="md:text-xl text-lg">{t("currency")}</p>
        <p className="md:text-base text-sm">{t("pick sentance")}</p>
        
      </div>

      <form action={handleAction} className="space-y-4">

        <CurrencySelect name="currency" defaultValue={currentBaseCurrency || "USD"}/>

        <Button type="submit" className="w-full bg-[#2F27CE] hover:bg-[#1f1a8e] text-white hover:cursor-pointer">{t("change")}</Button>

      </form>
      
      <Button onClick={logout} className="w-full bg-[#E21010] hover:bg-[#960a0a] cursor-pointer text-white">{t("logout")}</Button>
    </DialogContent>
  </Dialog>
  )
}