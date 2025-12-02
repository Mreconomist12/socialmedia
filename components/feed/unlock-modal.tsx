"use client"

import { Lock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface UnlockModalProps {
  isOpen: boolean
  price: number
  onClose: () => void
  onConfirm: () => void
}

export function UnlockModal({ isOpen, price, onClose, onConfirm }: UnlockModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-border/50 max-w-sm">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-foreground">Desbloquear Contenido</DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-accent" />
          </div>

          <p className="text-center text-muted-foreground mb-6">
            Este contenido exclusivo requiere un pago único para ser desbloqueado.
          </p>

          <div className="bg-secondary/50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Precio</span>
              <span className="text-2xl font-bold text-foreground">${price.toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={onConfirm} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground glow-pink">
            <CreditCard className="w-4 h-4 mr-2" />
            Pagar ${price.toFixed(2)}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">Pago seguro procesado por nuestra pasarela</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
