"use client";

import { CurrencySelect } from "../CurrencySelect";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { editPurchase, deletePurchase } from "@/app/actions/ActionPurchase";
import { Input } from "../ui/input";
import { CategoryPicker } from "../CategoryPicker";
import { useTranslation } from "react-i18next";
import { getDashboardData } from "@/app/lib/data";

interface EditPurchaseModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data: Awaited<ReturnType<typeof getDashboardData>>;
  selectedPurchase: Purchase | null;
};

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
type Purchase = DashboardData["purchases"][number];

export function EditPurchaseModal({ isOpen, setIsOpen, data, selectedPurchase }: EditPurchaseModalProps) {

    const { t } = useTranslation("common")

    if (!isOpen || !data || !selectedPurchase) return null

    async function handleAction(formData: FormData) {
        const result = await editPurchase(formData)
        if (result.success) {
            setIsOpen(false)
        } else {
            alert(result.error)
        }
    }

    async function handleDeleteClick() {
        const confirmed = confirm(t("deleteConfirm"))
        if (confirmed) {
            if (!selectedPurchase) return
            const result = await deletePurchase(selectedPurchase.id)
            if (result.success) {
                setIsOpen(false)
            } else {
                alert(result.error)
            }
        }
    }

    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[rgb(var(--background))]">
        <DialogHeader>
            <DialogTitle>{t("purchaseModal")}</DialogTitle>
        </DialogHeader>
        <p>{t("modalSentence")}</p>

        <form action={handleAction} className="space-y-4"> 

            <input type="hidden" name="purchaseId" value={selectedPurchase.id} />

            <label htmlFor="name">{t("name")}</label>
            <Input 
                name="name" 
                id="name" 
                placeholder="Name" 
                className="bg-[rgb(var(--secondary))] border-none placeholder:text-gray-500" 
                required 
                defaultValue={selectedPurchase.name}
            />

            <label htmlFor="category">{t("categoryPick")}</label>
            <CategoryPicker categories={data.categories} name="category" defaultValue={selectedPurchase.category.name}/>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="amount">{t("amount")}</label>
                    <Input 
                        name="amount" 
                        id="amount" 
                        type="number" 
                        placeholder="100" 
                        className="bg-[rgb(var(--secondary))] border-none placeholder:text-gray-500" 
                        required 
                        defaultValue={selectedPurchase.amount}
                    />
                </div>
                <div className="space-y-1">
                    <label>{t("currencySelect")}</label>
                    <CurrencySelect name="currency" defaultValue={selectedPurchase.currency}/>
                </div>
            </div>

            <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-[#2F27CE] hover:bg-[#1f1a8e] text-white py-6 hover:cursor-pointer">{t("change")}</Button>
                <Button type="button" className="flex-1 bg-[#E21010] hover:bg-[#9c0909] text-white py-6 hover:cursor-pointer" onClick={handleDeleteClick}>{t("delete")}</Button>
            </div>
        </form>

        </DialogContent>
    </Dialog>
    )
}
