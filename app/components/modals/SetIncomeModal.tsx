"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface SetIncomeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export function SetIncomeModal({ isOpen, setIsOpen }: SetIncomeModalProps) {
    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white">
        <DialogHeader>
            <DialogTitle>Set Income</DialogTitle>
        </DialogHeader>
        <p>stuff very important stuff</p>
        </DialogContent>
    </Dialog>
    )
}