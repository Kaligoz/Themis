"use client"

import { useTranslation } from 'react-i18next'
import i18n from '../lib/i18n'
import { Button } from "@/app/components/ui/button"

export function LanguageToggle() {
  
  const { t } = useTranslation("common")

  return (
    <div className="flex gap-2 w-full">
      <Button onClick={() => i18n.changeLanguage('en')} className="flex-1 bg-[rgb(var(--secondary))] cursor-pointer">
        {t("english")}
      </Button>
      <Button onClick={() => i18n.changeLanguage('ua')} className="flex-1 bg-[rgb(var(--secondary))] cursor-pointer">
        {t("ukrainian")}
      </Button>
    </div>
  )
}
