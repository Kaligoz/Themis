"use client"

import { useTheme } from "next-themes"
import { Switch } from "@/app/components/ui/switch"
import React from "react"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
  <div className="flex items-center space-x-2">
    <Switch
      id="theme-toggle"
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      aria-label="Toggle theme"
    />
  </div>
  )
}
