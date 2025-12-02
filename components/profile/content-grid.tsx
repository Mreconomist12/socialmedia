"use client"

import { Lock, Play, Heart, Eye } from "lucide-react"
import type { Video } from "@/lib/mock-data"
import { useState } from "react"
import { UnlockModal } from "@/components/feed/unlock-modal"

interface ContentGridProps {
  content: Video[]
}

export function ContentGrid({ content }: ContentGridProps) {
  const [unlockModal, setUnlockModal] = useState<{ isOpen: boolean; videoId: string; price: number }>({
    isOpen: false,
    videoId: "",
    price: 0,
  })

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  if (content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Play className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-center">No hay contenido disponible</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {content.map((video) => (
          <button
            key={video.id}
            onClick={() =>
              video.isLocked && setUnlockModal({ isOpen: true, videoId: video.id, price: video.price || 0 })
            }
            className="aspect-[9/16] relative overflow-hidden group"
          >
            <img
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.caption}
              className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${video.isLocked ? "blur-lg" : ""}`}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Lock Icon */}
            {video.isLocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-accent/80 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="absolute bottom-2 left-2 text-xs font-bold text-foreground bg-accent/80 px-2 py-0.5 rounded">
                  ${video.price}
                </span>
              </div>
            )}

            {/* Stats on hover */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-foreground" />
                <span className="text-xs font-medium text-foreground">{formatNumber(video.likes)}</span>
              </div>
              {video.views && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-foreground" />
                  <span className="text-xs font-medium text-foreground">{formatNumber(video.views)}</span>
                </div>
              )}
            </div>

            {/* Play icon */}
            {!video.isLocked && (
              <div className="absolute top-2 right-2">
                <Play className="w-4 h-4 text-foreground/80 fill-foreground/80" />
              </div>
            )}
          </button>
        ))}
      </div>

      <UnlockModal
        isOpen={unlockModal.isOpen}
        price={unlockModal.price}
        onClose={() => setUnlockModal({ isOpen: false, videoId: "", price: 0 })}
        onConfirm={() => {
          setUnlockModal({ isOpen: false, videoId: "", price: 0 })
        }}
      />
    </>
  )
}
