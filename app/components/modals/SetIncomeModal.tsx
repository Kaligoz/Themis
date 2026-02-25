"use client";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { createIncome } from "@/app/actions/setIncome";
import { Input } from "../ui/input";
import { CurrencySelect } from "../CurrencySelect";
import { useTranslation } from "react-i18next";

interface SetIncomeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialIncome?: number;
  initialCurrency?: string;
};

export function SetIncomeModal({ isOpen, setIsOpen, initialCurrency, initialIncome }: SetIncomeModalProps) {

  async function handleAction(formData: FormData) {
      const result = await createIncome(formData)
      if (result.success) {
          setIsOpen(false)
      } else {
          alert(result.error)
      }
  }

    const { t } = useTranslation("common")

    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[rgb(var(--background))]">
      <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{t("incomeModal")}</DialogTitle>
      </DialogHeader>
      <p className="md:text-base text-sm">{t("modalSentence")}</p>

      <form action={handleAction} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="income" className="md:text-base text-sm">{t("monthlyIncome")}</label>
            <Input 
              name="income" 
              id="income" 
              type="number" 
              defaultValue={initialIncome}
              placeholder="100" 
              className="bg-[rgb(var(--secondary))] border-none placeholder:text-gray-500 md:text-base text-sm" 
              required 
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="currency"  className="md:text-base text-sm">{t("pickCurrecncyType")}</label>
            <CurrencySelect name="currency" defaultValue={initialCurrency}/>
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="date"  className="md:text-base text-sm">{t("date")}</label>
          <Input 
            name="date" 
            id="date" 
            type="date" 
            defaultValue={new Date().toISOString().split('T')[0]} 
            className="bg-[rgb(var(--secondary))] border-none md:text-base text-sm"
            required 
          />
        </div>

        <Button type="submit" className="w-full bg-[#2F27CE] hover:bg-[#1f1a8e] text-white py-6 hover:cursor-pointer">
          {t("add")}
        </Button>
      </form>

      </DialogContent>
    </Dialog>
    )
}