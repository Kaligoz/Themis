"use client";

import { CurrencySelect } from "../CurrencySelect";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { createDebt } from "@/app/actions/addDebt";
import { Input } from "../ui/input";
import { CategoryPicker } from "../CategoryPicker";
import { useTranslation } from "react-i18next";

interface AddDebtModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  existingCategories: string[];
};

export function AddDebtModal({ isOpen, setIsOpen, existingCategories }: AddDebtModalProps) {

    const { t } = useTranslation("common")

    async function handleAction(formData: FormData) {
        const result = await createDebt(formData)
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
            <DialogTitle>{t("debtModal")}</DialogTitle>
        </DialogHeader>
        <p>{t("modalSentence")}</p>

        <form action={handleAction} className="space-y-4"> 

            <label htmlFor="category">{t("categoryPick")}</label>
            <CategoryPicker categories={existingCategories} name="category"/>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label htmlFor="initial">{t("initial")}</label>
                    <Input 
                        name="initial" 
                        id="initial" 
                        type="number" 
                        placeholder="10,000" 
                        className="bg-[rgb(var(--secondary))] border-none placeholder:text-gray-500" 
                        required 
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="current">{t("current")}</label>
                    <Input 
                        name="current" 
                        id="current" 
                        type="number" 
                        placeholder="5,000" 
                        className="bg-[rgb(var(--secondary))] border-none placeholder:text-gray-500" 
                        required 
                    />
                </div>
                <div className="space-y-1">
                    <label>{t("currencySelect")}</label>
                    <CurrencySelect name="currency"/>
                </div>
            </div>

          <Button type="submit" className="w-full bg-[#2F27CE] hover:bg-[#1f1a8e] text-white py-6 hover:cursor-pointer">
            {t("add")}
          </Button>
        </form>

        </DialogContent>
    </Dialog>
    )
}