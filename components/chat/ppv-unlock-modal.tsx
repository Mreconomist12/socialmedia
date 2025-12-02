"use client"

import { Lock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PPVUnlockModalProps {
  isOpen: boolean
  price: number
  onClose: () => void
  onUnlock: () => void
}

export function PPVUnlockModal({ isOpen, price, onClose, onUnlock }: PPVUnlockModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-border/50 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center">Desbloquear Contenido</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-accent" />
          </div>

          <p className="text-center text-muted-foreground mb-6">
            Este mensaje contiene contenido exclusivo que requiere un pago para ser desbloqueado.
          </p>

          <div className="bg-secondary/50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Precio</span>
              <span className="text-2xl font-bold text-foreground">${price.toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={onUnlock} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground glow-pink">
            <CreditCard className="w-4 h-4 mr-2" />
            Desbloquear por ${price.toFixed(2)}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Una vez desbloqueado, tendras acceso permanente
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
