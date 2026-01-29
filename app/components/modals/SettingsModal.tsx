"use client";

import { authClient } from "@/app/lib/auth-client";
import { LanguageToggle } from "../LanguageToggle";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface SetSettingsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const logOut = async() => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/auth"
      }
    }
  })
};

export function SettingsModal({ isOpen, setIsOpen }: SetSettingsProps) {
    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white">
        <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
            <ModeToggle/>
            <LanguageToggle/>
            <Button onClick={logOut} className="border">Logout</Button>
        <p>settings stuff</p>
        </DialogContent>
    </Dialog>
    )
}