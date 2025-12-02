"use client"

import { useState, useRef, useEffect } from "react"
import { X, Heart, Send, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Comment {
  id: string
  user: {
    username: string
    avatar: string
    isVerified?: boolean
  }
  text: string
  likes: number
  isLiked: boolean
  timeAgo: string
  replies?: Comment[]
}

interface CommentsModalProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
  commentCount: number
}

const mockComments: Comment[] = [
  {
    id: "1",
    user: { username: "carlos_mx", avatar: "/man-avatar.png", isVerified: false },
    text: "Increíble contenido! 🔥",
    likes: 234,
    isLiked: false,
    timeAgo: "2h",
  },
  {
    id: "2",
    user: { username: "maria_styles", avatar: "/diverse-woman-avatar.png", isVerified: true },
    text: "Me encanta tu estilo, eres la mejor 💕",
    likes: 89,
    isLiked: true,
    timeAgo: "4h",
  },
  {
    id: "3",
    user: { username: "fan_oficial", avatar: "/diverse-user-avatars.png" },
    text: "Siempre esperando tu nuevo contenido",
    likes: 45,
    isLiked: false,
    timeAgo: "6h",
  },
  {
    id: "4",
    user: { username: "pedro123", avatar: "/male-user-avatar.png" },
    text: "Hermosa como siempre ✨",
    likes: 156,
    isLiked: false,
    timeAgo: "8h",
  },
  {
    id: "5",
    user: { username: "ana_love", avatar: "/diverse-girl-avatar.png" },
    text: "Wow! Este video es top 🙌",
    likes: 67,
    isLiked: false,
    timeAgo: "12h",
  },
]

export function CommentsModal({ isOpen, onClose, videoId, commentCount }: CommentsModalProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setTimeout(() => inputRef.current?.focus(), 300)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
          : comment,
      ),
    )
  }

  const handleSubmitComment = () => {
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)

    const comment: Comment = {
      id: Date.now().toString(),
      user: { username: "tu_usuario", avatar: "/my-avatar.png" },
      text: newComment.trim(),
      likes: 0,
      isLiked: false,
      timeAgo: "ahora",
    }

    setComments((prev) => [comment, ...prev])
    setNewComment("")
    setIsSubmitting(false)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg h-[70vh] bg-card rounded-t-3xl flex flex-col animate-in slide-in-from-bottom duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-base font-semibold text-foreground">{formatNumber(commentCount)} comentarios</span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.username} />
                <AvatarFallback>{comment.user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-semibold text-sm text-foreground">@{comment.user.username}</span>
                  {comment.user.isVerified && (
                    <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-2 h-2 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">· {comment.timeAgo}</span>
                </div>

                <p className="text-sm text-foreground/90 break-words">{comment.text}</p>

                <div className="flex items-center gap-4 mt-1.5">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Heart className={cn("w-4 h-4", comment.isLiked && "fill-accent text-accent")} />
                    <span>{formatNumber(comment.likes)}</span>
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Responder
                  </button>
                </div>
              </div>

              <button className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 border-t border-border bg-card/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src="/my-avatar.png" alt="Tu avatar" />
              <AvatarFallback>TU</AvatarFallback>
            </Avatar>

            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                placeholder="Agregar un comentario..."
                className="w-full px-4 py-2.5 rounded-full bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <Button
              size="icon"
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
              className={cn(
                "rounded-full w-10 h-10 flex-shrink-0 transition-all",
                newComment.trim()
                  ? "bg-accent hover:bg-accent/90 text-accent-foreground glow-pink"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
