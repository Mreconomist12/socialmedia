"use client"

import { useState } from "react"
import { ArrowLeft, MoreHorizontal, Share2, Check, Crown, Instagram, Twitter, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Creator } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { SubscribeModal } from "@/components/feed/subscribe-modal"

interface ProfileHeaderProps {
  creator: Creator
  isOwnProfile?: boolean
}

export function ProfileHeader({ creator, isOwnProfile = false }: ProfileHeaderProps) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <>
      <div className="relative">
        {/* Banner */}
        <div className="h-44 relative overflow-hidden">
          <img
            src={creator.banner || "/placeholder.svg"}
            alt={`${creator.displayName} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

          {/* Top Navigation */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 safe-area-top">
            <Link href="/" className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
                <Share2 className="w-5 h-5 text-foreground" />
              </button>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
                <MoreHorizontal className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4 -mt-12 relative z-10">
          {/* Avatar */}
          <div className="flex items-end gap-4 mb-4">
            <Avatar className="w-24 h-24 ring-4 ring-background">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.displayName} />
              <AvatarFallback className="text-2xl">{creator.displayName[0]}</AvatarFallback>
            </Avatar>

            {/* Action Buttons */}
            {!isOwnProfile && (
              <div className="flex-1 flex items-center gap-2 pb-2">
                <Button
                  onClick={() => (isSubscribed ? setIsSubscribed(false) : setShowSubscribeModal(true))}
                  className={cn(
                    "flex-1",
                    isSubscribed
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      : "bg-accent text-accent-foreground hover:bg-accent/90 glow-pink",
                  )}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  {isSubscribed ? "Suscrito" : `Suscribirse $${creator.subscriptionPrice}/mes`}
                </Button>
                <Button variant="outline" size="icon" className="border-border bg-transparent">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            )}

            {isOwnProfile && (
              <div className="flex-1 flex items-center gap-2 pb-2">
                <Button variant="outline" className="flex-1 border-border bg-transparent">
                  Editar Perfil
                </Button>
                <Link href="/profile/wallet">
                  <Button className="bg-primary text-primary-foreground glow-cyan">Billetera</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Name & Verification */}
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-foreground">{creator.displayName}</h1>
            {creator.isVerified && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
          </div>
          <p className="text-muted-foreground mb-3">@{creator.username}</p>

          {/* Bio */}
          {creator.bio && <p className="text-foreground/90 text-sm leading-relaxed mb-4">{creator.bio}</p>}

          {/* Social Links */}
          {creator.socialLinks && (
            <div className="flex items-center gap-3 mb-4">
              {creator.socialLinks.instagram && (
                <a
                  href={`https://instagram.com/${creator.socialLinks.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
              {creator.socialLinks.twitter && (
                <a
                  href={`https://twitter.com/${creator.socialLinks.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              )}
              {creator.socialLinks.tiktok && (
                <a
                  href={`https://tiktok.com/@${creator.socialLinks.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>TikTok</span>
                </a>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{formatNumber(creator.subscriberCount)}</p>
              <p className="text-xs text-muted-foreground">Suscriptores</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{formatNumber(creator.totalLikes || 0)}</p>
              <p className="text-xs text-muted-foreground">Likes</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{creator.totalVideos || 0}</p>
              <p className="text-xs text-muted-foreground">Videos</p>
            </div>
          </div>
        </div>
      </div>

      <SubscribeModal
        isOpen={showSubscribeModal}
        creator={creator}
        onClose={() => setShowSubscribeModal(false)}
        onConfirm={() => {
          setIsSubscribed(true)
          setShowSubscribeModal(false)
        }}
      />
    </>
  )
}
