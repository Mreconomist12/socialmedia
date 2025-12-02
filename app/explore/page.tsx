"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Hash, TrendingUp, X, ChevronLeft } from "lucide-react"
import Link from "next/link"
import {
  categories,
  trendingHashtags,
  getVideosByHashtag,
  getVideosByCategory,
  mockCreators,
  type Video,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BottomNav } from "@/components/navigation/bottom-nav"

function ExploreContent() {
  const searchParams = useSearchParams()
  const tagParam = searchParams.get("tag")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTag, setSelectedTag] = useState<string | null>(tagParam)
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])

  useEffect(() => {
    if (selectedTag) {
      setFilteredVideos(getVideosByHashtag(selectedTag))
    } else if (selectedCategory !== "all") {
      setFilteredVideos(getVideosByCategory(selectedCategory))
    } else {
      setFilteredVideos([])
    }
  }, [selectedTag, selectedCategory])

  useEffect(() => {
    if (tagParam) {
      setSelectedTag(tagParam)
    }
  }, [tagParam])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const clearFilters = () => {
    setSelectedTag(null)
    setSelectedCategory("all")
    setSearchQuery("")
  }

  return (
    <main className="min-h-[100dvh] bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 safe-area-top">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link
            href="/"
            className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar creadoras o hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Active Filter Indicator */}
        {(selectedTag || selectedCategory !== "all") && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Filtrando por:</span>
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/50 text-primary text-sm"
            >
              {selectedTag ? `#${selectedTag}` : categories.find((c) => c.id === selectedCategory)?.name}
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Categorías</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id)
                  setSelectedTag(null)
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all",
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground glow-cyan"
                    : "bg-muted/50 text-foreground hover:bg-muted",
                )}
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Hashtags */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold text-foreground">Hashtags en tendencia</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {trendingHashtags.map((item, index) => (
              <button
                key={item.tag}
                onClick={() => {
                  setSelectedTag(item.tag)
                  setSelectedCategory("all")
                }}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all",
                  selectedTag === item.tag ? "bg-accent/20 border border-accent/50" : "bg-muted/30 hover:bg-muted/50",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    index < 3 ? "bg-accent/20" : "bg-muted",
                  )}
                >
                  <Hash className={cn("w-5 h-5", index < 3 ? "text-accent" : "text-muted-foreground")} />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">#{item.tag}</p>
                  <p className="text-xs text-muted-foreground">{formatNumber(item.count)} videos</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Results */}
        {filteredVideos.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground mb-3">Resultados ({filteredVideos.length})</h2>
            <div className="grid grid-cols-3 gap-1">
              {filteredVideos.map((video) => (
                <Link
                  key={video.id}
                  href={`/video/${video.id}`}
                  className="relative aspect-[9/16] rounded-lg overflow-hidden group"
                >
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.caption}
                    className={cn(
                      "w-full h-full object-cover transition-transform group-hover:scale-105",
                      video.isLocked && "blur-sm",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center gap-1.5">
                      <Avatar className="w-5 h-5">
                        <AvatarImage src={video.creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{video.creator.displayName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-foreground font-medium truncate">@{video.creator.username}</span>
                    </div>
                  </div>
                  {video.isLocked && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-accent/80 text-accent-foreground text-xs font-medium">
                      ${video.price}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Creators */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Creadoras sugeridas</h2>
          <div className="space-y-3">
            {mockCreators.slice(0, 5).map((creator) => (
              <Link
                key={creator.id}
                href={`/profile/${creator.username}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all"
              >
                <Avatar className="w-14 h-14 ring-2 ring-primary/50">
                  <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.displayName} />
                  <AvatarFallback>{creator.displayName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-foreground">{creator.displayName}</span>
                    {creator.isVerified && (
                      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-[10px]">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">@{creator.username}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatNumber(creator.subscriberCount)} suscriptores
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium">
                    ${creator.subscriptionPrice}/mes
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  )
}
