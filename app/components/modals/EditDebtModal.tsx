"use client";

import { CurrencySelect } from "../CurrencySelect";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { editDebt, deleteDebt } from "@/app/actions/ActionDebt";
import { Input } from "../ui/input";
import { CategoryPicker } from "../CategoryPicker";
import { useTranslation } from "react-i18next";
import { getDashboardData } from "@/app/lib/data";

interface AddDebtModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data: Awaited<ReturnType<typeof getDashboardData>>;
  selectedDebt: Debt | null;
};

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
type Debt = DashboardData["debts"][number];

export function EditDebtModal({ isOpen, setIsOpen, data, selectedDebt }: AddDebtModalProps) {

    const { t } = useTranslation("common")

    if (!isOpen || !data || !selectedDebt) return null

    async function handleAction(formData: FormData) {
        const result = await editDebt(formData)
        if (result.success) {
            setIsOpen(false)
        } else {
            alert(result.error)
        }
    }

    async function handleDeleteClick() {
        const confirmed = confirm(t("deleteConfirm") || "Are you sure you want to delete this?")
        if (confirmed) {
            if (!selectedDebt) return
            const result = await deleteDebt(selectedDebt.id)
            if (result.success) {
                setIsOpen(false);
            } else {
                alert(result.error);
            }
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

            <input type="hidden" name="debtId" value={selectedDebt.id} />

            <label htmlFor="category">{t("categoryPick")}</label>
            <CategoryPicker categories={data.categories} name="category" defaultValue={selectedDebt.category.name}/>

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
                        defaultValue={selectedDebt.initial}
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
                        defaultValue={selectedDebt.current}
                    />
                </div>
                <div className="space-y-1">
                    <label>{t("currencySelect")}</label>
                    <CurrencySelect name="currency" defaultValue={selectedDebt.currency}/>
                </div>
            </div>


            <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-[#2F27CE] hover:bg-[#1f1a8e] text-white py-6 hover:cursor-pointer">Change</Button>
                <Button type="button" className="flex-1 bg-[#E21010] hover:bg-[#9c0909] text-white py-6 hover:cursor-pointer" onClick={handleDeleteClick}>Delete</Button>
            </div>
        </form>

        </DialogContent>
    </Dialog>
    )
}