"use client"

import { ModeToggle } from "@/app/components/ModeToggle";
import { LanguageToggle } from "@/app/components/LanguageToggle";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ModeToggle/>
        <LanguageToggle/>
        <h1>{t("appName")}</h1>
        <p>{t("description")}</p>
      </main>
    </div>
  );
}
