"use client"

import { useState } from "react"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  ArrowUpRight,
  Clock,
  ChevronRight,
  CreditCard,
  Building,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Creator } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WalletDashboardProps {
  creator: Creator
}

const mockTransactions = [
  { id: "1", type: "subscription", amount: 19.99, from: "fan_user123", date: "2025-01-30", status: "completed" },
  { id: "2", type: "tip", amount: 50.0, from: "premium_fan", date: "2025-01-30", status: "completed" },
  { id: "3", type: "ppv", amount: 9.99, from: "new_subscriber", date: "2025-01-29", status: "completed" },
  { id: "4", type: "subscription", amount: 19.99, from: "loyal_fan_22", date: "2025-01-29", status: "completed" },
  { id: "5", type: "withdrawal", amount: -500.0, from: "Bank Transfer", date: "2025-01-28", status: "pending" },
  { id: "6", type: "tip", amount: 25.0, from: "casual_viewer", date: "2025-01-28", status: "completed" },
]

export function WalletDashboard({ creator }: WalletDashboardProps) {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const stats = creator.stats || {
    earnings: 0,
    pendingBalance: 0,
    totalWithdrawn: 0,
    thisMonthEarnings: 0,
  }

  const lastMonthEarnings = stats.thisMonthEarnings * 0.85 // Mock comparison
  const earningsChange = ((stats.thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100

  return (
    <>
      <div className="px-4 pt-4 safe-area-top">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={`/profile/${creator.username}`}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Billetera</h1>
            <p className="text-sm text-muted-foreground">Gestiona tus ganancias</p>
          </div>
        </div>

        {/* Main Balance Card */}
        <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Balance Disponible</p>
                <p className="text-4xl font-bold text-foreground">{formatCurrency(stats.pendingBalance)}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
            <Button
              onClick={() => setShowWithdrawModal(true)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Retirar Fondos
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Este Mes</span>
              </div>
              <p className="text-xl font-bold text-foreground">{formatCurrency(stats.thisMonthEarnings)}</p>
              <div
                className={`flex items-center gap-1 mt-1 ${earningsChange >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {earningsChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-xs font-medium">{Math.abs(earningsChange).toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">Total Ganado</span>
              </div>
              <p className="text-xl font-bold text-foreground">{formatCurrency(stats.earnings)}</p>
              <p className="text-xs text-muted-foreground mt-1">{creator.subscriberCount} suscriptores</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-xs text-muted-foreground">Total Retirado</span>
              </div>
              <p className="text-xl font-bold text-foreground">{formatCurrency(stats.totalWithdrawn)}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-muted-foreground">Pendiente</span>
              </div>
              <p className="text-xl font-bold text-foreground">{formatCurrency(stats.pendingBalance)}</p>
              <p className="text-xs text-muted-foreground mt-1">3-5 dias hábiles</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground">Transacciones Recientes</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Ver todas
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {mockTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === "withdrawal"
                          ? "bg-yellow-500/20"
                          : tx.type === "tip"
                            ? "bg-accent/20"
                            : tx.type === "ppv"
                              ? "bg-primary/20"
                              : "bg-green-500/20"
                      }`}
                    >
                      {tx.type === "withdrawal" ? (
                        <ArrowUpRight className="w-5 h-5 text-yellow-500" />
                      ) : tx.type === "tip" ? (
                        <DollarSign className="w-5 h-5 text-accent" />
                      ) : (
                        <CreditCard className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm capitalize">
                        {tx.type === "subscription"
                          ? "Suscripción"
                          : tx.type === "tip"
                            ? "Propina"
                            : tx.type === "ppv"
                              ? "PPV"
                              : "Retiro"}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.from}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.amount >= 0 ? "text-green-500" : "text-foreground"}`}>
                      {tx.amount >= 0 ? "+" : ""}
                      {formatCurrency(tx.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdraw Modal */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogContent className="glass border-border/50 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-foreground">Retirar Fondos</DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Disponible para retiro</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.pendingBalance)}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-foreground">
                Cantidad a retirar
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="pl-8 bg-input border-border text-foreground"
                />
              </div>
              <button
                onClick={() => setWithdrawAmount(stats.pendingBalance.toString())}
                className="text-xs text-primary hover:underline"
              >
                Retirar todo
              </button>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Método de retiro</Label>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 rounded-xl border border-primary bg-primary/10 flex items-center gap-2">
                  <Building className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Banco</span>
                </button>
                <button className="p-3 rounded-xl border border-border bg-secondary/30 flex items-center gap-2 hover:border-border/80">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tarjeta</span>
                </button>
              </div>
            </div>

            <Button
              onClick={() => setShowWithdrawModal(false)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
              disabled={!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0}
            >
              Confirmar Retiro
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Los retiros tardan 3-5 días hábiles en procesarse
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
