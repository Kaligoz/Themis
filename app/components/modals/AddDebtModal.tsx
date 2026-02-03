"use client";

import { CurrencySelect } from "../CurrencySelect";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { createDebt } from "@/app/actions/addDebt";
import { Input } from "../ui/input";

interface AddDebtModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export function AddDebtModal({ isOpen, setIsOpen }: AddDebtModalProps) {

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
            <DialogTitle>Add a Debt</DialogTitle>
        </DialogHeader>
        <p>For us to better understand and calculate your finances please fill in the information below:</p>

        <form action={handleAction} className="space-y-4"> 

            <label htmlFor="category">Pick a category</label>
            <Input 
                name="category" 
                id="category" 
                placeholder="Select a category" 
                className="bg-[#DDDBFF] border-none" 
                required 
            />

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label htmlFor="initial">Inital</label>
                    <Input 
                        name="initial" 
                        id="initial" 
                        type="number" 
                        placeholder="10,000" 
                        className="bg-[#DDDBFF] border-none" 
                        required 
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="current">Current</label>
                    <Input 
                        name="current" 
                        id="current" 
                        type="number" 
                        placeholder="5,000" 
                        className="bg-[#DDDBFF] border-none" 
                        required 
                    />
                </div>
                <div className="space-y-1">
                    <label>Currency</label>
                    <CurrencySelect name="currency" defaultValue="USD"/>
                </div>
            </div>

          <Button type="submit" className="w-full bg-[#2F27CE] hover:bg-[#1f1a8e] text-white py-6 hover:cursor-pointer">
            Add
          </Button>
        </form>

        </DialogContent>
    </Dialog>
    )
}