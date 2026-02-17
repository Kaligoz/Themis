"use client";

import { CurrencySelect } from "../CurrencySelect";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { editSubscription, deleteSubscription } from "@/app/actions/ActionSubscription";
import { Input } from "../ui/input";
import { CategoryPicker } from "../CategoryPicker";
import { useTranslation } from "react-i18next";
import { getDashboardData } from "@/app/lib/data";
import { Switch } from "../ui/switch";

interface EditSubscriptionModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    data: Awaited<ReturnType<typeof getDashboardData>>;
    selectedSubscription: Subscription | null;
};

type DashboardData = NonNullable<Awaited<ReturnType<typeof getDashboardData>>>;
type Subscription = DashboardData["subs"][number];

export function EditSubscriptionModal({ isOpen, setIsOpen, data, selectedSubscription }: EditSubscriptionModalProps) {

    const { t } = useTranslation("common")

    if (!isOpen || !data || !selectedSubscription) return null

    async function handleAction(formData: FormData) {
        const result = await editSubscription(formData)
        if (result.success) {
            setIsOpen(false)
        } else {
            alert(result.error)
        }
    }

    async function handleDeleteClick() {
        const confirmed = confirm(t("deleteConfirm") || "Are you sure you want to delete this?")
        if (confirmed) {
            if (!selectedSubscription) return
            const result = await deleteSubscription(selectedSubscription.id)
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
            <DialogTitle>{t("subscriptionModal")}</DialogTitle>
        </DialogHeader>
        <p>{t("modalSentence")}</p>

        <form action={handleAction} className="space-y-4"> 

            <input type="hidden" name="subscriptionId" value={selectedSubscription.id} />

            <label htmlFor="name">{t("name")}</label>
            <Input 
                name="name" 
                id="name" 
                type="text" 
                placeholder="Name" 
                className="bg-[rgb(var(--secondary))] border-none placeholder:text-gray-500" 
                required 
                defaultValue={selectedSubscription.name}
            />

            <label htmlFor="category">{t("categoryPick")}</label>
            <CategoryPicker categories={data.categories} name="category" defaultValue={selectedSubscription.category.name}/>

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
                        defaultValue={selectedSubscription.amount}
                    />
                </div>
                <div className="space-y-1">
                    <label>{t("currencySelect")}</label>
                    <CurrencySelect name="currency" defaultValue={selectedSubscription.currency}/>
                </div>
            </div>

            <label htmlFor="cycle">{t("billingCycle")}</label>
            <Input 
                name="cycle" 
                id="cycle" 
                type="number" 
                placeholder="30" 
                className="bg-[rgb(var(--secondary))] border-none placeholder:text-gray-500" 
                required 
                defaultValue={selectedSubscription.billingCycle}
            />

            <div className="flex items-center space-x-2 py-2">
                <label htmlFor="isActive" className="text-sm font-medium">{t("activeStatus")}</label>
                <Switch id="isActive" name="isActive" defaultChecked={selectedSubscription.isActive}/>
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