"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, MoreVertical, Send, ImageIcon, DollarSign, Lock, Check, Gift } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Conversation, Message } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { TipModal } from "./tip-modal"
import { PPVUnlockModal } from "./ppv-unlock-modal"

interface ChatViewProps {
  conversation: Conversation
}

export function ChatView({ conversation }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages)
  const [newMessage, setNewMessage] = useState("")
  const [showTipModal, setShowTipModal] = useState(false)
  const [ppvUnlockModal, setPpvUnlockModal] = useState<{ isOpen: boolean; messageId: string; price: number }>({
    isOpen: false,
    messageId: "",
    price: 0,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: `new-${Date.now()}`,
      senderId: "user",
      content: newMessage,
      type: "text",
      timestamp: "Just now",
      isRead: false,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleTip = (amount: number) => {
    const tipMessage: Message = {
      id: `tip-${Date.now()}`,
      senderId: "user",
      content: `Sent a $${amount} tip`,
      type: "tip",
      timestamp: "Just now",
      isRead: false,
      tipAmount: amount,
    }
    setMessages([...messages, tipMessage])
    setShowTipModal(false)
  }

  const handleUnlockPPV = (messageId: string) => {
    setMessages(messages.map((m) => (m.id === messageId ? { ...m, ppvUnlocked: true } : m)))
    setPpvUnlockModal({ isOpen: false, messageId: "", price: 0 })
  }

  const { participant } = conversation

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border safe-area-top">
        <Link href="/messages" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>

        <Link href={`/profile/${participant.username}`} className="flex items-center gap-3 flex-1">
          <Avatar className="w-10 h-10">
            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.displayName} />
            <AvatarFallback>{participant.displayName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">{participant.displayName}</span>
              {participant.isVerified && (
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
              )}
            </div>
            <span className="text-xs text-green-500">Online</span>
          </div>
        </Link>

        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            participant={participant}
            onUnlockPPV={(price) => setPpvUnlockModal({ isOpen: true, messageId: message.id, price })}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-border safe-area-bottom">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowTipModal(true)}
            className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent hover:bg-accent/30 transition-colors"
          >
            <Gift className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="bg-secondary border-0 pr-12 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Button
            onClick={handleSend}
            size="icon"
            disabled={!newMessage.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <TipModal
        isOpen={showTipModal}
        creatorName={participant.displayName}
        onClose={() => setShowTipModal(false)}
        onTip={handleTip}
      />

      <PPVUnlockModal
        isOpen={ppvUnlockModal.isOpen}
        price={ppvUnlockModal.price}
        onClose={() => setPpvUnlockModal({ isOpen: false, messageId: "", price: 0 })}
        onUnlock={() => handleUnlockPPV(ppvUnlockModal.messageId)}
      />
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  participant: { displayName: string; avatar: string }
  onUnlockPPV: (price: number) => void
}

function MessageBubble({ message, participant, onUnlockPPV }: MessageBubbleProps) {
  const isUser = message.senderId === "user"

  if (message.type === "tip") {
    return (
      <div className="flex justify-center">
        <div className="bg-accent/20 border border-accent/30 rounded-xl px-4 py-2 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Gift className="w-4 h-4 text-accent" />
            <span className="font-semibold text-accent">${message.tipAmount} Tip</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {isUser ? `You sent a tip to ${participant.displayName}` : `${participant.displayName} thanked you!`}
          </p>
        </div>
      </div>
    )
  }

  if (message.type === "ppv") {
    return (
      <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
        {!isUser && (
          <Avatar className="w-8 h-8 mt-auto">
            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.displayName} />
            <AvatarFallback>{participant.displayName[0]}</AvatarFallback>
          </Avatar>
        )}
        <div
          className={cn(
            "max-w-[75%] rounded-2xl overflow-hidden",
            isUser ? "bg-primary text-primary-foreground" : "bg-secondary",
          )}
        >
          {/* PPV Content Preview */}
          <div className="relative aspect-[4/3] w-48">
            <img
              src={message.imageUrl || "/placeholder.svg"}
              alt="PPV content"
              className={cn("w-full h-full object-cover", !message.ppvUnlocked && "blur-xl")}
            />
            {!message.ppvUnlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50">
                <div className="w-10 h-10 rounded-full bg-accent/80 flex items-center justify-center mb-2">
                  <Lock className="w-5 h-5 text-accent-foreground" />
                </div>
                <Button
                  onClick={() => onUnlockPPV(message.ppvPrice || 0)}
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <DollarSign className="w-3 h-3 mr-1" />
                  Unlock ${message.ppvPrice}
                </Button>
              </div>
            )}
          </div>
          <div className="px-3 py-2">
            <p className="text-sm">{message.content}</p>
            <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="w-8 h-8 mt-auto">
          <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.displayName} />
          <AvatarFallback>{participant.displayName[0]}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[75%] px-4 py-2.5 rounded-2xl",
          isUser ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm",
        )}
      >
        <p className="text-sm">{message.content}</p>
        <span className={cn("text-xs mt-1 block", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {message.timestamp}
        </span>
      </div>
    </div>
  )
}
