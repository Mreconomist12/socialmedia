"use client"

import { useState } from "react"
import { Search, Settings, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { mockConversations, type Conversation } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function ConversationList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredConversations = mockConversations.filter((conv) => {
    const matchesSearch =
      conv.participant.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || (filter === "unread" && conv.unreadCount > 0)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="px-4 pt-4 safe-area-top">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Mensajes</h1>
        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar conversaciones..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-secondary border-0 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            filter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground",
          )}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            filter === "unread"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground",
          )}
        >
          No leidos
        </button>
      </div>

      {/* Conversation List */}
      <div className="space-y-1">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay conversaciones</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem key={conversation.id} conversation={conversation} />
          ))
        )}
      </div>
    </div>
  )
}

function ConversationItem({ conversation }: { conversation: Conversation }) {
  const { participant, lastMessage, lastMessageTime, unreadCount } = conversation

  return (
    <Link
      href={`/messages/${conversation.id}`}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
    >
      <div className="relative">
        <Avatar className="w-14 h-14">
          <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.displayName} />
          <AvatarFallback>{participant.displayName[0]}</AvatarFallback>
        </Avatar>
        {/* Online indicator */}
        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-semibold text-foreground truncate">{participant.displayName}</span>
          {participant.isVerified && (
            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Check className="w-2.5 h-2.5 text-primary-foreground" />
            </div>
          )}
        </div>
        <p
          className={cn("text-sm truncate", unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground")}
        >
          {lastMessage}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-muted-foreground">{lastMessageTime}</span>
        {unreadCount > 0 && (
          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
            <span className="text-xs font-bold text-accent-foreground">{unreadCount}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
