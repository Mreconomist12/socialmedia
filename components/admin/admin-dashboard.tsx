"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  Video,
  DollarSign,
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Eye,
  ChevronRight,
  Bell,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { adminStats, topCreators, recentTransactions } from "@/lib/admin-data"
import { cn } from "@/lib/utils"
import Link from "next/link"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "content", label: "Moderación", icon: Video, badge: adminStats.pendingContent },
  { id: "users", label: "Usuarios", icon: Users },
  { id: "finance", label: "Finanzas", icon: DollarSign },
  { id: "reports", label: "Reportes", icon: AlertTriangle, badge: 3 },
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TTFANS Admin</h1>
              <p className="text-xs text-muted-foreground">God Mode</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-xs font-bold text-accent-foreground flex items-center justify-center">
                5
              </span>
            </button>
            <Avatar className="w-10 h-10">
              <AvatarImage src="/admin-avatar.png" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-bold",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-accent text-accent-foreground",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <h3 className="font-semibold text-foreground mb-2">God Mode Active</h3>
            <p className="text-xs text-muted-foreground mb-3">Full platform access enabled</p>
            <Link href="/">
              <Button size="sm" variant="outline" className="w-full border-border text-foreground bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                View as User
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-500" />
                      </div>
                      <div
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium",
                          adminStats.revenueChange >= 0 ? "text-green-500" : "text-red-500",
                        )}
                      >
                        {adminStats.revenueChange >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {Math.abs(adminStats.revenueChange)}%
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(adminStats.totalRevenue)}</p>
                    <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                        <TrendingUp className="w-4 h-4" />
                        {adminStats.usersChange}%
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{formatNumber(adminStats.totalUsers)}</p>
                    <p className="text-sm text-muted-foreground">Usuarios Totales</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Video className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                        <TrendingUp className="w-4 h-4" />
                        {adminStats.creatorsChange}%
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{formatNumber(adminStats.totalCreators)}</p>
                    <p className="text-sm text-muted-foreground">Creadoras Activas</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-yellow-500" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(adminStats.pendingPayouts)}</p>
                    <p className="text-sm text-muted-foreground">Pagos Pendientes</p>
                  </CardContent>
                </Card>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Creators */}
                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg text-foreground">Top Creadoras</CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Ver todas
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {topCreators.map((creator, index) => (
                        <div key={creator.id} className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <span className="w-6 text-center text-sm font-bold text-muted-foreground">
                              #{index + 1}
                            </span>
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.displayName} />
                              <AvatarFallback>{creator.displayName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{creator.displayName}</p>
                              <p className="text-xs text-muted-foreground">@{creator.username}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-500">{formatCurrency(creator.monthlyEarnings)}</p>
                            <p className="text-xs text-muted-foreground">este mes</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg text-foreground">Transacciones Recientes</CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Ver todas
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                tx.type === "payout"
                                  ? "bg-yellow-500/20"
                                  : tx.type === "tip"
                                    ? "bg-accent/20"
                                    : tx.type === "ppv"
                                      ? "bg-primary/20"
                                      : "bg-green-500/20",
                              )}
                            >
                              <DollarSign
                                className={cn(
                                  "w-5 h-5",
                                  tx.type === "payout"
                                    ? "text-yellow-500"
                                    : tx.type === "tip"
                                      ? "text-accent"
                                      : tx.type === "ppv"
                                        ? "text-primary"
                                        : "text-green-500",
                                )}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-foreground capitalize">{tx.type}</p>
                              <p className="text-xs text-muted-foreground">{tx.creator}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={cn("font-bold", tx.amount >= 0 ? "text-green-500" : "text-foreground")}>
                              {tx.amount >= 0 ? "+" : ""}
                              {formatCurrency(tx.amount)}
                            </p>
                            <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Acciones Rapidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      onClick={() => setActiveTab("content")}
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center gap-2 border-border"
                    >
                      <Video className="w-6 h-6 text-accent" />
                      <span className="text-foreground">Moderar Contenido</span>
                      <span className="text-xs text-muted-foreground">{adminStats.pendingContent} pendientes</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center gap-2 border-border bg-transparent"
                    >
                      <DollarSign className="w-6 h-6 text-green-500" />
                      <span className="text-foreground">Procesar Pagos</span>
                      <span className="text-xs text-muted-foreground">12 solicitudes</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("reports")}
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center gap-2 border-border"
                    >
                      <AlertTriangle className="w-6 h-6 text-yellow-500" />
                      <span className="text-foreground">Ver Reportes</span>
                      <span className="text-xs text-muted-foreground">3 nuevos</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center gap-2 border-border bg-transparent"
                    >
                      <Users className="w-6 h-6 text-primary" />
                      <span className="text-foreground">Gestionar Usuarios</span>
                      <span className="text-xs text-muted-foreground">158K usuarios</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "content" && <ContentModerationPanel />}
          {activeTab === "reports" && <ReportsPanel />}
        </main>
      </div>
    </div>
  )
}

function ContentModerationPanel() {
  const [pendingItems, setPendingItems] = useState(require("@/lib/admin-data").pendingContent)

  const handleApprove = (id: string) => {
    setPendingItems((items: typeof pendingItems) => items.filter((item: { id: string }) => item.id !== id))
  }

  const handleReject = (id: string) => {
    setPendingItems((items: typeof pendingItems) => items.filter((item: { id: string }) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Moderación de Contenido</h2>
          <p className="text-muted-foreground">Revisa y aprueba el contenido antes de publicarlo</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-medium">
            {pendingItems.length} pendientes
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pendingItems.map(
          (item: {
            id: string
            creatorAvatar: string
            creatorName: string
            submittedAt: string
            thumbnail: string
            type: string
            isExplicit: boolean
            caption: string
          }) => (
            <Card key={item.id} className="bg-card border-border overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={item.thumbnail || "/placeholder.svg"}
                  alt="Content preview"
                  className="w-full h-full object-cover"
                />
                {item.isExplicit && (
                  <div className="absolute top-2 right-2 px-2 py-1 rounded bg-red-500 text-white text-xs font-bold">
                    EXPLICIT
                  </div>
                )}
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-background/80 text-foreground text-xs font-medium capitalize">
                  {item.type}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={item.creatorAvatar || "/placeholder.svg"} alt={item.creatorName} />
                    <AvatarFallback>{item.creatorName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground text-sm">{item.creatorName}</p>
                    <p className="text-xs text-muted-foreground">{item.submittedAt}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.caption}</p>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleApprove(item.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Aprobar
                  </Button>
                  <Button onClick={() => handleReject(item.id)} variant="destructive" className="flex-1">
                    Rechazar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ),
        )}
      </div>

      {pendingItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Todo al dia</h3>
          <p className="text-muted-foreground">No hay contenido pendiente de moderación</p>
        </div>
      )}
    </div>
  )
}

function ReportsPanel() {
  const reports = require("@/lib/admin-data").userReports

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Reportes de Usuarios</h2>
        <p className="text-muted-foreground">Gestiona las denuncias y reportes de la comunidad</p>
      </div>

      <div className="space-y-4">
        {reports.map(
          (report: {
            id: string
            reportedUser: string
            reportedBy: string
            reason: string
            timestamp: string
            status: string
          }) => (
            <Card key={report.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        report.status === "pending"
                          ? "bg-yellow-500/20"
                          : report.status === "reviewed"
                            ? "bg-primary/20"
                            : "bg-green-500/20",
                      )}
                    >
                      <AlertTriangle
                        className={cn(
                          "w-5 h-5",
                          report.status === "pending"
                            ? "text-yellow-500"
                            : report.status === "reviewed"
                              ? "text-primary"
                              : "text-green-500",
                        )}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">@{report.reportedUser}</span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                            report.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : report.status === "reviewed"
                                ? "bg-primary/20 text-primary"
                                : "bg-green-500/20 text-green-500",
                          )}
                        >
                          {report.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{report.reason}</p>
                      <p className="text-xs text-muted-foreground">
                        Reportado por @{report.reportedBy} - {report.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-border text-foreground bg-transparent">
                      Ver Perfil
                    </Button>
                    <Button size="sm" variant="destructive">
                      Banear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </div>
  )
}
