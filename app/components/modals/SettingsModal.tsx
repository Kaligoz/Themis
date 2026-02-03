"use client";

import { authClient } from "@/app/lib/auth-client";
import { LanguageToggle } from "../LanguageToggle";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { IconMoonFilled } from "@tabler/icons-react";
import { CurrencySelect } from "../CurrencySelect";

interface SetSettingsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const logout = async() => {
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
      <DialogContent className="bg-[rgb(var(--background))]">
      <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
      </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconMoonFilled/>
            <p className="text-xl">Dark/Light Mode</p>
          </div>
          <ModeToggle/>
        </div>
        <p className="text-xl">Language</p>
        <LanguageToggle/>
        <div className="space-y-1">
         <p className="text-xl">Dashboard currency</p>
          <p className="text-base">Pick in which currency the dashboard will be displayed in.
          <br/>By default the dashboard will be in USD.</p>
        </div>

        <CurrencySelect name="currency" defaultValue="USD"/>
        
        <Button onClick={logout} className="w-full bg-[#E21010] hover:bg-[#960a0a] cursor-pointer text-white">Logout</Button>
      </DialogContent>
    </Dialog>
    )
}