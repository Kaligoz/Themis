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
          <DialogTitle>{t("incomeModal")}</DialogTitle>
      </DialogHeader>
      <p>{t("modalSentence")}</p>

      <form action={handleAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="income">{t("monthlyIncome")}</label>
            <Input 
              name="income" 
              id="income" 
              type="number" 
              defaultValue={initialIncome}
              placeholder="100" 
              className="bg-[rgb(var(--secondary))] border-none placeholder:text-gray-500" 
              required 
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="currency">{t("pickCurrecncyType")}</label>
            <CurrencySelect name="currency" defaultValue={initialCurrency}/>
          </div>
        </div>

        <Button type="submit" className="w-full bg-[#2F27CE] hover:bg-[#1f1a8e] text-white py-6 hover:cursor-pointer">
          {initialIncome ? "Update" : "Add"}
        </Button>
      </form>

      </DialogContent>
    </Dialog>
    )
}