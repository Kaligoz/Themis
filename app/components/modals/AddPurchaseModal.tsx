"use client";

import { CurrencySelect } from "../CurrencySelect";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { createPurchase } from "@/app/actions/addPurchase";
import { Input } from "../ui/input";

interface AddPurchaseModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export function AddPurchaseModal({ isOpen, setIsOpen }: AddPurchaseModalProps) {

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
            <DialogTitle>Add a Purchase</DialogTitle>
        </DialogHeader>
        <p>For us to better understand and calculate your finances please fill in the information below:</p>

        <form action={handleAction} className="space-y-4"> 

            <label htmlFor="name">Name</label>
            <Input 
                name="name" 
                id="name" 
                type="text" 
                placeholder="Name" 
                className="bg-[#DDDBFF] border-none" 
                required 
            />

            <label htmlFor="category">Pick a category</label>
            <Input 
                name="category" 
                id="category" 
                placeholder="Select a category" 
                className="bg-[#DDDBFF] border-none" 
                required 
            />

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="amount">Amount paid</label>
                    <Input 
                        name="amount" 
                        id="amount" 
                        type="number" 
                        placeholder="100" 
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