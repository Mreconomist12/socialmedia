"use client"

import { useState } from "react"
import { VideoFeed } from "@/components/feed/video-feed"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { TopHeader } from "@/components/navigation/top-header"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"following" | "foryou">("foryou")

  return (
    <main className="h-[100dvh] w-full bg-background overflow-hidden">
      <TopHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <VideoFeed activeTab={activeTab} />
      <BottomNav />
    </main>
  )
}
