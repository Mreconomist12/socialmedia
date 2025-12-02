"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { VideoCard } from "./video-card"
import { type Video, mockUserPreferences, getFollowingFeed, getForYouFeed } from "@/lib/mock-data"
import { UnlockModal } from "./unlock-modal"
import { SubscribeModal } from "./subscribe-modal"
import { UserPlus } from "lucide-react"
import Link from "next/link"

interface VideoFeedProps {
  activeTab: "following" | "foryou"
}

export function VideoFeed({ activeTab }: VideoFeedProps) {
  // 1. ESTADO PARA EVITAR ERROR DE HIDRATACIÓN
  const [isMounted, setIsMounted] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Inicializamos vacíos para evitar conflictos servidor/cliente
  const [followingVideos, setFollowingVideos] = useState<Video[]>([])
  const [forYouVideos, setForYouVideos] = useState<Video[]>([])

  const videos = activeTab === "following" ? followingVideos : forYouVideos

  const [unlockModal, setUnlockModal] = useState<{ isOpen: boolean; videoId: string; price: number }>({
    isOpen: false,
    videoId: "",
    price: 0,
  })
  const [subscribeModal, setSubscribeModal] = useState<{ isOpen: boolean; creatorId: string }>({
    isOpen: false,
    creatorId: "",
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const touchStartY = useRef(0)

  // 2. EFECTO DE CARGA INICIAL (Solo corre en el navegador)
  useEffect(() => {
    setIsMounted(true) // Ya estamos en el cliente

    // Cargamos los datos de prueba
    const initialFollowing = getFollowingFeed(mockUserPreferences)
    const initialForYou = getForYouFeed(mockUserPreferences)
    
    // Cargamos los posts locales del usuario
    const savedPostsJSON = localStorage.getItem('posts')
    let localPosts: Video[] = []

    if (savedPostsJSON) {
      try {
        const savedPosts = JSON.parse(savedPostsJSON)
        localPosts = savedPosts.map((post: any) => ({
          id: post.id.toString(),
          caption: post.caption,
          videoUrl: post.imageUrl, 
          thumbnailUrl: post.imageUrl,
          likes: 0,
          comments: 0,
          shares: 0,
          isLiked: false,
          isSaved: false,
          isFollowing: true,
          price: 0,
          isLocked: false,
          creator: {
            id: 'current-user',
            username: post.username || 'Yo',
            displayName: post.username || 'Yo',
            avatarUrl: post.userImage || 'https://github.com/shadcn.png',
            isVerified: false,
            bio: 'Creador de contenido'
          }
        }))
      } catch (error) {
        console.error("Error al cargar posts locales:", error)
      }
    }

    // Combinamos todo sin duplicados
    const mergeVideos = (baseVideos: Video[], newVideos: Video[]) => {
      const uniqueNew = newVideos.filter(
         nV => !baseVideos.some(bV => bV.id === nV.id)
      )
      return [...uniqueNew, ...baseVideos]
    }

    setFollowingVideos(mergeVideos(initialFollowing, localPosts))
    setForYouVideos(mergeVideos(initialForYou, localPosts))

  }, []) // El array vacío asegura que esto solo pase una vez al montar

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeTab])

  const scrollToVideo = useCallback(
    (index: number) => {
      if (index < 0 || index >= videos.length || isScrolling.current) return
      isScrolling.current = true
      setCurrentIndex(index)
      setTimeout(() => {
        isScrolling.current = false
      }, 500)
    },
    [videos.length],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        scrollToVideo(currentIndex + 1)
      } else if (e.key === "ArrowUp" || e.key === "k") {
        scrollToVideo(currentIndex - 1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, scrollToVideo])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        scrollToVideo(currentIndex + 1)
      } else {
        scrollToVideo(currentIndex - 1)
      }
    }
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          scrollToVideo(currentIndex + 1)
        } else {
          scrollToVideo(currentIndex - 1)
        }
      }
    },
    [currentIndex, scrollToVideo],
  )

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      return () => container.removeEventListener("wheel", handleWheel)
    }
  }, [handleWheel])

  const handleUnlock = (videoId: string, price: number) => {
    setUnlockModal({ isOpen: true, videoId, price })
  }

  const handleSubscribe = (creatorId: string) => {
    setSubscribeModal({ isOpen: true, creatorId })
  }

  // 3. SI NO ESTÁ MONTADO AÚN, NO MOSTRAMOS NADA (Evita el error rojo)
  if (!isMounted) {
    return <div className="h-[100dvh] w-full bg-black" />
  }

  if (activeTab === "following" && videos.length === 0) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Aún no sigues a nadie</h2>
          <p className="text-muted-foreground mb-6">
            Explora el feed "Para ti" y sigue a las creadoras que más te gusten para ver su contenido aquí.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors glow-pink"
          >
            Explorar creadoras
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        ref={containerRef}
        className="h-[100dvh] w-full overflow-hidden relative bg-black"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateY(-${currentIndex * 100}%)` }}
        >
          {videos.map((video, index) => (
            <div key={video.id} className="h-[100dvh] w-full">
              <VideoCard
                video={video}
                isActive={index === currentIndex}
                onUnlock={handleUnlock}
                onSubscribe={handleSubscribe}
                showNewBadge={activeTab === "foryou" && !video.isFollowing}
              />
            </div>
          ))}
        </div>

        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToVideo(index)}
              className={`w-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? "h-6 bg-primary glow-cyan" : "h-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>

      <UnlockModal
        isOpen={unlockModal.isOpen}
        price={unlockModal.price}
        onClose={() => setUnlockModal({ isOpen: false, videoId: "", price: 0 })}
        onConfirm={() => {
          setUnlockModal({ isOpen: false, videoId: "", price: 0 })
        }}
      />

      <SubscribeModal
        isOpen={subscribeModal.isOpen}
        creator={videos.find((v) => v.creator.id === subscribeModal.creatorId)?.creator}
        onClose={() => setSubscribeModal({ isOpen: false, creatorId: "" })}
        onConfirm={() => {
          setSubscribeModal({ isOpen: false, creatorId: "" })
        }}
      />
    </>
  )
}