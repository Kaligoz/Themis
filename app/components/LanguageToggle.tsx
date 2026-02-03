"use client"

import i18n from '../lib/i18n'

import { Button } from "@/app/components/ui/button"

export function LanguageToggle() {
  return (
    <div className="flex gap-2 w-full">
      <Button onClick={() => i18n.changeLanguage('en')} className="flex-1 bg-[rgb(var(--secondary))] cursor-pointer">
        English
      </Button>
      <Button onClick={() => i18n.changeLanguage('ua')} className="flex-1 bg-[rgb(var(--secondary))] cursor-pointer">
        Ukranian
      </Button>
    </div>
  )
}
