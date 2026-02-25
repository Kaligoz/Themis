"use client";

import { CurrencySelect } from "../CurrencySelect";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { createPurchase } from "@/app/actions/ActionPurchase";
import { Input } from "../ui/input";
import { CategoryPicker } from "../CategoryPicker";
import { useTranslation } from "react-i18next";

interface AddPurchaseModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  existingCategories: string[];
};

export function AddPurchaseModal({ isOpen, setIsOpen, existingCategories }: AddPurchaseModalProps) {

    const { t } = useTranslation("common")

    async function handleAction(formData: FormData) {
        const result = await createPurchase(formData)
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
            <DialogTitle className="text-xl md:text-2xl">{t("purchaseModal")}</DialogTitle>
        </DialogHeader>
        <p className="md:text-base text-sm">{t("modalSentence")}</p>

        <form action={handleAction} className="space-y-4"> 

            <label htmlFor="name" className="md:text-base text-sm">{t("name")}</label>
            <Input 
                name="name" 
                id="name" 
                placeholder="Name" 
                className="bg-[rgb(var(--secondary))] border-none placeholder:text-gray-500 md:text-base text-sm" 
                required 
            />

            <label htmlFor="category" className="md:text-base text-sm">{t("categoryPick")}</label>
            <CategoryPicker categories={existingCategories} name="category"/>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="amount" className="md:text-base text-sm">{t("amount")}</label>
                    <Input 
                        name="amount" 
                        id="amount" 
                        type="number" 
                        placeholder="100" 
                        className="bg-[rgb(var(--secondary))] border-none placeholder:text-gray-500 md:text-base text-sm" 
                        required 
                    />
                </div>
                <div className="space-y-1">
                    <label className="md:text-base text-sm">{t("currencySelect")}</label>
                    <CurrencySelect name="currency" defaultValue="USD"/>
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