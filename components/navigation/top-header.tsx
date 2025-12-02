"use client"
import { Settings, Search } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TopHeaderProps {
  activeTab: "following" | "foryou"
  onTabChange: (tab: "following" | "foryou") => void
}

export function TopHeader({ activeTab, onTabChange }: TopHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-area-top">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Settings */}
        <Link
          href="/settings"
          className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
        >
          <Settings className="w-5 h-5" />
        </Link>

        {/* Tab Switcher */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onTabChange("following")}
            className={cn(
              "text-base font-semibold transition-all relative",
              activeTab === "following" ? "text-foreground" : "text-foreground/50",
            )}
          >
            Siguiendo
            {activeTab === "following" && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
          <div className="w-px h-4 bg-foreground/20" />
          <button
            onClick={() => onTabChange("foryou")}
            className={cn(
              "text-base font-semibold transition-all relative",
              activeTab === "foryou" ? "text-foreground" : "text-foreground/50",
            )}
          >
            Para ti
            {activeTab === "foryou" && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
            )}
          </button>
        </div>

        <Link
          href="/explore"
          className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
        >
          <Search className="w-5 h-5" />
        </Link>
      </div>
    </header>
  )
}
