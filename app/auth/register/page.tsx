"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Flame, User, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type AccountType = "fan" | "creator"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState<AccountType | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    ageVerified: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1 && accountType) {
      setStep(2)
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    if (accountType === "creator") {
      router.push("/auth/creator-onboarding")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TTFANS
          </h1>
          <p className="text-muted-foreground mt-2">{step === 1 ? "Elige tu tipo de cuenta" : "Crea tu cuenta"}</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={cn("w-8 h-1 rounded-full", step >= 1 ? "bg-primary" : "bg-muted")} />
          <div className={cn("w-8 h-1 rounded-full", step >= 2 ? "bg-primary" : "bg-muted")} />
        </div>

        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              /* Step 1: Account Type Selection */
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setAccountType("fan")}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all",
                    accountType === "fan"
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-background/50 hover:border-border",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        accountType === "fan" ? "bg-primary text-white" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <User className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Soy Fan</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Descubre creadores, suscríbete y accede a contenido exclusivo
                      </p>
                    </div>
                    {accountType === "fan" && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType("creator")}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all",
                    accountType === "creator"
                      ? "border-accent bg-accent/10"
                      : "border-border/50 bg-background/50 hover:border-border",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        accountType === "creator" ? "bg-accent text-white" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Soy Creador/a</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Monetiza tu contenido, crea suscripciones y conecta con fans
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                          80% de ganancias
                        </span>
                      </div>
                    </div>
                    {accountType === "creator" && (
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold h-12 mt-4"
                  disabled={!accountType}
                >
                  Continuar
                </Button>
              </div>
            ) : (
              /* Step 2: Account Details */
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50 border-border/50 focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Nombre de usuario</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                    <Input
                      id="username"
                      type="text"
                      placeholder="tunombre"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-primary pl-8"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-primary pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.ageVerified}
                      onChange={(e) => setFormData({ ...formData, ageVerified: e.target.checked })}
                      className="mt-0.5 rounded border-border"
                      required
                    />
                    <span className="text-muted-foreground">
                      Confirmo que tengo al menos <span className="text-foreground font-medium">18 años</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="mt-0.5 rounded border-border"
                      required
                    />
                    <span className="text-muted-foreground">
                      Acepto los{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Términos de Servicio
                      </Link>{" "}
                      y{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Política de Privacidad
                      </Link>
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-background/50 border-border/50"
                  >
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold"
                    disabled={isLoading || !formData.ageVerified || !formData.agreeTerms}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Crear cuenta"
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
