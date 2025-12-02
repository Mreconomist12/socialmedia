"use client"

import { useState } from "react"
import { Grid3X3, Lock, Heart, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Creator, Video } from "@/lib/mock-data"
import { ContentGrid } from "./content-grid"

interface ProfileTabsProps {
  creator: Creator
  content: Video[]
}

type TabType = "posts" | "exclusive" | "liked" | "saved"

export function ProfileTabs({ creator, content }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("posts")

  const tabs = [
    { id: "posts" as TabType, icon: Grid3X3, label: "Posts" },
    { id: "exclusive" as TabType, icon: Lock, label: "Exclusivo" },
    { id: "liked" as TabType, icon: Heart, label: "Likes" },
    { id: "saved" as TabType, icon: Bookmark, label: "Guardados" },
  ]

  const getFilteredContent = () => {
    switch (activeTab) {
      case "posts":
        return content.filter((v) => !v.isLocked)
      case "exclusive":
        return content.filter((v) => v.isLocked)
      case "liked":
        return content.filter((v) => v.isLiked)
      case "saved":
        return content.slice(0, 3)
      default:
        return content
    }
  }

  return (
    <div className="mt-6">
      {/* Tab Bar - sticky for better UX */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm flex items-center border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 relative transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">{tab.label}</span>
              {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          )
        })}
      </div>

      {/* Content Grid - natural flow */}
      <ContentGrid content={getFilteredContent()} />
    </div>
  )
}
