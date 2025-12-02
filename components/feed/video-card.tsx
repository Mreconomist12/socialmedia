"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Lock, Bookmark, UserPlus, Check, DollarSign, Hash, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Video } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link" // IMPORTANTE: Importamos Link para la navegación
import { CommentsModal } from "./comments-modal"

interface VideoCardProps {
  video: Video
  isActive: boolean
  onUnlock?: (videoId: string, price: number) => void
  onSubscribe?: (creatorId: string) => void
  showNewBadge?: boolean
}

export function VideoCard({ video, isActive, onUnlock, onSubscribe, showNewBadge }: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(video.isLiked)
  const [isFollowing, setIsFollowing] = useState(video.isFollowing)
  const [likes, setLikes] = useState(video.likes)
  const [isSaved, setIsSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)

  if (!video) return null;

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleFollow = () => {
    if (!isFollowing) {
      onSubscribe?.(video.creator.id)
    }
    setIsFollowing(!isFollowing)
  }

  const formatNumber = (num: number) => {
    if (!num) return "0"
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const isVideoContent = 
    video.videoUrl?.endsWith(".mp4") || 
    video.videoUrl?.endsWith(".webm") || 
    video.videoUrl?.startsWith("data:video");

  return (
    <>
      <div className="relative h-full w-full bg-black flex items-center justify-center">
        {/* Video Container */}
        <div className="relative h-full w-full max-w-[calc(100vh*9/16)] mx-auto bg-background">
          
          {/* MEDIA CONTENT */}
          <div className="absolute inset-0 bg-black">
            {isVideoContent ? (
              <video
                src={video.videoUrl}
                className={cn("h-full w-full object-cover", video.isLocked && "blur-xl scale-110")}
                autoPlay={isActive}
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={video.videoUrl || video.thumbnail || "/placeholder.svg"}
                alt={video.caption || "Content"}
                className={cn("h-full w-full object-cover", video.isLocked && "blur-xl scale-110")}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* New Badge */}
          {showNewBadge && !isFollowing && (
            <div className="absolute top-20 left-4 z-20">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/50 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-medium text-accent">Nueva para ti</span>
              </div>
            </div>
          )}

          {/* Locked Content Overlay */}
          {video.isLocked && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="glass rounded-2xl p-8 text-center max-w-xs mx-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Contenido Exclusivo</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Desbloquea este video por ${video.price?.toFixed(2) || "0.00"}
                </p>
                <Button
                  onClick={() => onUnlock?.(video.id, video.price || 0)}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground glow-pink"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Desbloquear
                </Button>
              </div>
            </div>
          )}

          {/* --- BARRA LATERAL DERECHA --- */}
          <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-20">
            
            {/* FOTO DE PERFIL (CON ENLACE) */}
            <div className="relative">
              {/* Envolvemos el Avatar en un Link que lleva al perfil */}
              <Link href={`/profile/${video.creator?.username || "user"}`}>
                <Avatar className="w-12 h-12 ring-2 ring-primary cursor-pointer hover:scale-110 transition-transform">
                  <AvatarImage 
                    src={video.creator?.avatar || video.creator?.avatarUrl || "/placeholder.svg"} 
                    alt={video.creator?.displayName} 
                  />
                  <AvatarFallback>{video.creator?.displayName?.[0] || "?"}</AvatarFallback>
                </Avatar>
              </Link>
              
              <button
                onClick={handleFollow}
                className={cn(
                  "absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all z-10",
                  isFollowing ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground glow-pink",
                )}
              >
                {isFollowing ? <Check className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
              </button>
            </div>

            {/* Botones de interacción (Like, Comment, Share) */}
            <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-all", isLiked ? "bg-accent/20" : "bg-foreground/10 group-hover:bg-foreground/20")}>
                <Heart className={cn("w-7 h-7 transition-all", isLiked ? "fill-accent text-accent" : "text-foreground")} />
              </div>
              <span className="text-xs font-medium text-foreground">{formatNumber(likes)}</span>
            </button>

            <button onClick={() => setShowComments(true)} className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-all">
                <MessageCircle className="w-7 h-7 text-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground">{formatNumber(video.comments)}</span>
            </button>

            <button onClick={() => setIsSaved(!isSaved)} className="flex flex-col items-center gap-1 group">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-all", isSaved ? "bg-primary/20" : "bg-foreground/10 group-hover:bg-foreground/20")}>
                <Bookmark className={cn("w-7 h-7 transition-all", isSaved ? "fill-primary text-primary" : "text-foreground")} />
              </div>
              <span className="text-xs font-medium text-foreground">Guardar</span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-all">
                <Share2 className="w-7 h-7 text-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground">{formatNumber(video.shares)}</span>
            </button>
          </div>

          {/* --- INFORMACIÓN INFERIOR --- */}
          <div className="absolute bottom-20 left-0 right-16 px-4 z-20">
            {/* Nombre del creador (Con enlace) */}
            <Link 
              href={`/profile/${video.creator?.username || "user"}`} 
              className="flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity w-fit"
            >
              <span className="font-bold text-foreground text-lg shadow-black drop-shadow-md">
                @{video.creator?.username || "Usuario"}
              </span>
              {video.creator?.isVerified && (
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
              )}
            </Link>

            <p className="text-sm text-foreground/90 line-clamp-2 leading-relaxed mb-2 drop-shadow-md">
                {video.caption}
            </p>

            {video.tags && video.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {video.tags.slice(0, 4).map((tag) => (
                  <Link key={tag} href={`/explore?tag=${tag}`} className="flex items-center gap-0.5 px-2 py-1 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors backdrop-blur-sm">
                    <Hash className="w-3 h-3 text-primary" />
                    <span className="text-xs text-foreground/80">{tag}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CommentsModal isOpen={showComments} onClose={() => setShowComments(false)} videoId={video.id} commentCount={video.comments} />
    </>
  )
}