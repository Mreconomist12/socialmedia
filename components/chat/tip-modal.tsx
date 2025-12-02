"use client"

import { useState } from "react"
import { Gift, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface TipModalProps {
  isOpen: boolean
  creatorName: string
  onClose: () => void
  onTip: (amount: number) => void
}

const quickTipAmounts = [5, 10, 25, 50, 100]

export function TipModal({ isOpen, creatorName, onClose, onTip }: TipModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")

  const currentAmount = customAmount ? Number.parseFloat(customAmount) : selectedAmount

  const handleTip = () => {
    if (currentAmount && currentAmount > 0) {
      onTip(currentAmount)
      setSelectedAmount(null)
      setCustomAmount("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-border/50 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center">Enviar Propina</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-accent" />
          </div>

          <p className="text-center text-muted-foreground mb-6">
            Enviar una propina a <span className="text-foreground font-medium">{creatorName}</span>
          </p>

          {/* Quick amounts */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {quickTipAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount)
                  setCustomAmount("")
                }}
                className={cn(
                  "py-2 rounded-lg font-medium text-sm transition-all",
                  selectedAmount === amount && !customAmount
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80",
                )}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="relative mb-6">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Cantidad personalizada"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(null)
              }}
              className="pl-8 bg-input border-border text-foreground"
            />
          </div>

          <Button
            onClick={handleTip}
            disabled={!currentAmount || currentAmount <= 0}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground glow-pink disabled:opacity-50"
          >
            <Gift className="w-4 h-4 mr-2" />
            Enviar ${currentAmount?.toFixed(2) || "0.00"}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">Las propinas van directamente a la creadora</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
