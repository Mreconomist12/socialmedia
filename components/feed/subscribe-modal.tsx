"use client"

import { Crown, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Creator } from "@/lib/mock-data"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface SubscribeModalProps {
  isOpen: boolean
  creator?: Creator
  onClose: () => void
  onConfirm: () => void
}

const subscriptionTiers = [
  {
    id: "basic",
    name: "Virtual Friend",
    price: 5.99,
    benefits: ["Acceso a contenido exclusivo", "Chat directo", "Contenido semanal"],
  },
  {
    id: "standard",
    name: "Girlfriend",
    price: 19.99,
    benefits: ["Todo de Virtual Friend", "Contenido diario", "Fotos personalizadas", "Respuestas prioritarias"],
    popular: true,
  },
  {
    id: "premium",
    name: "Soulmate",
    price: 49.99,
    benefits: ["Todo de Girlfriend", "Videollamadas mensuales", "Contenido personalizado", "Acceso VIP exclusivo"],
  },
]

export function SubscribeModal({ isOpen, creator, onClose, onConfirm }: SubscribeModalProps) {
  const [selectedTier, setSelectedTier] = useState("standard")

  if (!creator) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-border/50 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center">Suscribirse</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Creator Info */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="w-14 h-14 ring-2 ring-primary">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.displayName} />
              <AvatarFallback>{creator.displayName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{creator.displayName}</span>
                {creator.isVerified && (
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                )}
              </div>
              <span className="text-sm text-muted-foreground">@{creator.username}</span>
            </div>
          </div>

          {/* Subscription Tiers */}
          <div className="space-y-3 mb-6">
            {subscriptionTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={cn(
                  "w-full p-4 rounded-xl border transition-all text-left relative",
                  selectedTier === tier.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-secondary/30 hover:border-border/80",
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-2 left-4 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Más Popular
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Crown
                      className={cn(
                        "w-5 h-5",
                        tier.id === "premium"
                          ? "text-yellow-500"
                          : tier.id === "standard"
                            ? "text-accent"
                            : "text-muted-foreground",
                      )}
                    />
                    <span className="font-semibold text-foreground">{tier.name}</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">${tier.price}/mes</span>
                </div>
                <ul className="space-y-1">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Check className="w-3 h-3 text-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <Button
            onClick={onConfirm}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
          >
            Suscribirse por ${subscriptionTiers.find((t) => t.id === selectedTier)?.price}/mes
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">Cancela cuando quieras. Pago seguro.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
