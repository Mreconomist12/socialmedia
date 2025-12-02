"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Flame,
  Camera,
  Globe,
  DollarSign,
  Shield,
  ArrowRight,
  ArrowLeft,
  Instagram,
  Twitter,
  Check,
  Upload,
  MapPin,
  FileCheck,
  Video,
  CreditCard,
  X,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Verificación", icon: FileCheck },
  { id: 2, title: "Perfil", icon: Camera },
  { id: 3, title: "Redes", icon: Globe },
  { id: 4, title: "Precios", icon: DollarSign },
  { id: 5, title: "Privacidad", icon: Shield },
]

const blockedCountries = [
  { code: "AR", name: "Argentina" },
  { code: "MX", name: "México" },
  { code: "ES", name: "España" },
  { code: "CO", name: "Colombia" },
  { code: "CL", name: "Chile" },
  { code: "PE", name: "Perú" },
  { code: "VE", name: "Venezuela" },
  { code: "US", name: "Estados Unidos" },
]

const documentTypes = [
  { id: "id", name: "Identificación Oficial (INE/DNI)", icon: CreditCard },
  { id: "passport", name: "Pasaporte", icon: FileCheck },
  { id: "license", name: "Licencia de Conducir", icon: CreditCard },
]

export default function CreatorOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [verificationData, setVerificationData] = useState({
    documentType: "",
    documentFront: null as File | null,
    documentFrontPreview: "",
    documentBack: null as File | null,
    documentBackPreview: "",
    verificationVideo: null as File | null,
    verificationVideoPreview: "",
  })

  const documentFrontRef = useRef<HTMLInputElement>(null)
  const documentBackRef = useRef<HTMLInputElement>(null)
  const verificationVideoRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
    avatar: null as string | null,
    banner: null as string | null,
  })

  const [socialData, setSocialData] = useState({
    instagram: "",
    twitter: "",
    tiktok: "",
    website: "",
  })

  const [pricingData, setPricingData] = useState({
    tier1Price: "5",
    tier2Price: "20",
    tier3Price: "50",
    tier1Name: "Virtual Friend",
    tier2Name: "Girlfriend",
    tier3Name: "Soulmate",
  })

  const [privacyData, setPrivacyData] = useState({
    blockedCountries: [] as string[],
    hideFromSearch: false,
  })

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "documentFront" | "documentBack" | "verificationVideo",
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)

    setVerificationData((prev) => ({
      ...prev,
      [type]: file,
      [`${type}Preview`]: previewUrl,
    }))
  }

  const removeFile = (type: "documentFront" | "documentBack" | "verificationVideo") => {
    if (verificationData[`${type}Preview` as keyof typeof verificationData]) {
      URL.revokeObjectURL(verificationData[`${type}Preview` as keyof typeof verificationData] as string)
    }
    setVerificationData((prev) => ({
      ...prev,
      [type]: null,
      [`${type}Preview`]: "",
    }))
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    router.push("/profile")
  }

  const toggleCountry = (code: string) => {
    setPrivacyData((prev) => ({
      ...prev,
      blockedCountries: prev.blockedCountries.includes(code)
        ? prev.blockedCountries.filter((c) => c !== code)
        : [...prev.blockedCountries, code],
    }))
  }

  const isVerificationComplete =
    verificationData.documentType &&
    verificationData.documentFront &&
    verificationData.documentBack &&
    verificationData.verificationVideo

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">Verificación de Creador</h1>
              <p className="text-xs text-muted-foreground">Paso {currentStep} de 5</p>
            </div>
          </div>
          {currentStep > 1 && (
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              Saltar por ahora
            </Button>
          )}
        </div>
      </header>

      {/* Progress Steps */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    currentStep > step.id
                      ? "bg-primary text-white"
                      : currentStep === step.id
                        ? "bg-gradient-to-br from-primary to-accent text-white"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium hidden sm:block",
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 mt-[-20px] sm:mt-[-20px]",
                    currentStep > step.id ? "bg-primary" : "bg-muted",
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 pb-8">
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Verificación de Identidad</h2>
                <p className="text-muted-foreground mt-1">
                  Para proteger a nuestra comunidad, necesitamos verificar tu identidad
                </p>
              </div>

              {/* Aviso importante */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-500">Importante</p>
                  <p className="text-muted-foreground mt-1">
                    Debes ser mayor de 18 años. Tus documentos serán revisados por nuestro equipo y eliminados después
                    de la verificación. Este proceso puede tardar 24-48 horas.
                  </p>
                </div>
              </div>

              {/* Selección de tipo de documento */}
              <div className="space-y-3">
                <Label>Tipo de documento</Label>
                <div className="grid gap-3">
                  {documentTypes.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setVerificationData((prev) => ({ ...prev, documentType: doc.id }))}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all flex items-center gap-3",
                        verificationData.documentType === doc.id
                          ? "border-primary bg-primary/10"
                          : "border-border/50 bg-background/30 hover:border-border",
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          verificationData.documentType === doc.id
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <doc.icon className="w-5 h-5" />
                      </div>
                      <span
                        className={cn(
                          "font-medium",
                          verificationData.documentType === doc.id ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {doc.name}
                      </span>
                      {verificationData.documentType === doc.id && <Check className="w-5 h-5 text-primary ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload de documento frente */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Frente del documento
                </Label>
                <input
                  ref={documentFrontRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "documentFront")}
                />
                {verificationData.documentFrontPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-border/50">
                    <img
                      src={verificationData.documentFrontPreview || "/placeholder.svg"}
                      alt="Frente del documento"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile("documentFront")}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-green-500/90 text-white text-xs flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Cargado
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => documentFrontRef.current?.click()}
                    className="w-full h-48 rounded-xl bg-background/30 border-2 border-dashed border-border/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                    <p className="font-medium text-foreground">Click para subir</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG hasta 10MB</p>
                  </button>
                )}
              </div>

              {/* Upload de documento reverso */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Reverso del documento
                </Label>
                <input
                  ref={documentBackRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "documentBack")}
                />
                {verificationData.documentBackPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-border/50">
                    <img
                      src={verificationData.documentBackPreview || "/placeholder.svg"}
                      alt="Reverso del documento"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile("documentBack")}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-green-500/90 text-white text-xs flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Cargado
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => documentBackRef.current?.click()}
                    className="w-full h-48 rounded-xl bg-background/30 border-2 border-dashed border-border/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                    <p className="font-medium text-foreground">Click para subir</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG hasta 10MB</p>
                  </button>
                )}
              </div>

              {/* Upload de video de verificación */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Video de verificación
                </Label>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/30 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">Instrucciones para el video:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Sostén tu documento de identidad junto a tu rostro</li>
                    <li>Di en voz alta: "Solicito unirme a TTFANS como creador"</li>
                    <li>Menciona la fecha de hoy</li>
                    <li>El video debe durar entre 5-15 segundos</li>
                  </ol>
                </div>
                <input
                  ref={verificationVideoRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "verificationVideo")}
                />
                {verificationData.verificationVideoPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-border/50">
                    <video
                      src={verificationData.verificationVideoPreview}
                      className="w-full h-48 object-cover"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => removeFile("verificationVideo")}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-green-500/90 text-white text-xs flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Cargado
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => verificationVideoRef.current?.click()}
                    className="w-full h-48 rounded-xl bg-background/30 border-2 border-dashed border-border/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <Video className="w-10 h-10 text-muted-foreground mb-3" />
                    <p className="font-medium text-foreground">Click para subir video</p>
                    <p className="text-xs text-muted-foreground mt-1">MP4, MOV hasta 50MB</p>
                  </button>
                )}
              </div>

              {/* Resumen de archivos cargados */}
              <div className="p-4 rounded-xl bg-muted/20 border border-border/30">
                <p className="font-medium text-foreground mb-3">Archivos requeridos</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tipo de documento</span>
                    {verificationData.documentType ? (
                      <span className="text-green-500 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Seleccionado
                      </span>
                    ) : (
                      <span className="text-amber-500">Pendiente</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Frente del documento</span>
                    {verificationData.documentFront ? (
                      <span className="text-green-500 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Cargado
                      </span>
                    ) : (
                      <span className="text-amber-500">Pendiente</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reverso del documento</span>
                    {verificationData.documentBack ? (
                      <span className="text-green-500 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Cargado
                      </span>
                    ) : (
                      <span className="text-amber-500">Pendiente</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Video de verificación</span>
                    {verificationData.verificationVideo ? (
                      <span className="text-green-500 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Cargado
                      </span>
                    ) : (
                      <span className="text-amber-500">Pendiente</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Profile */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Configura tu perfil</h2>
                <p className="text-muted-foreground mt-1">Esta información será visible para tus fans</p>
              </div>

              {/* Banner Upload */}
              <div className="space-y-2">
                <Label>Banner</Label>
                <div className="relative h-32 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-dashed border-border/50 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">Click para subir banner</p>
                  </div>
                </div>
              </div>

              {/* Avatar Upload */}
              <div className="space-y-2">
                <Label>Foto de perfil</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-dashed border-border/50 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                    <Camera className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>JPG, PNG o GIF</p>
                    <p>Máximo 5MB</p>
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName">Nombre para mostrar</Label>
                <Input
                  id="displayName"
                  placeholder="Tu nombre artístico"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  placeholder="Cuéntale a tus fans sobre ti..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="bg-background/50 border-border/50 min-h-[100px]"
                />
              </div>
            </div>
          )}

          {/* Step 3: Social Links */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Conecta tus redes</h2>
                <p className="text-muted-foreground mt-1">Opcional: ayuda a tus fans a encontrarte</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    Instagram
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                    <Input
                      id="instagram"
                      placeholder="tu_instagram"
                      value={socialData.instagram}
                      onChange={(e) => setSocialData({ ...socialData, instagram: e.target.value })}
                      className="bg-background/50 border-border/50 pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-sky-500" />
                    Twitter / X
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                    <Input
                      id="twitter"
                      placeholder="tu_twitter"
                      value={socialData.twitter}
                      onChange={(e) => setSocialData({ ...socialData, twitter: e.target.value })}
                      className="bg-background/50 border-border/50 pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok" className="flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                    TikTok
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                    <Input
                      id="tiktok"
                      placeholder="tu_tiktok"
                      value={socialData.tiktok}
                      onChange={(e) => setSocialData({ ...socialData, tiktok: e.target.value })}
                      className="bg-background/50 border-border/50 pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    Sitio web
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://tusitio.com"
                    value={socialData.website}
                    onChange={(e) => setSocialData({ ...socialData, website: e.target.value })}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Pricing */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Configura tus precios</h2>
                <p className="text-muted-foreground mt-1">Define los niveles de suscripción para tus fans</p>
              </div>

              <div className="space-y-4">
                {/* Tier 1 */}
                <div className="p-4 rounded-xl border border-border/50 bg-background/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-sm">💙</span>
                      </div>
                      <Input
                        value={pricingData.tier1Name}
                        onChange={(e) => setPricingData({ ...pricingData, tier1Name: e.target.value })}
                        className="bg-transparent border-none font-semibold p-0 h-auto w-32"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={pricingData.tier1Price}
                        onChange={(e) => setPricingData({ ...pricingData, tier1Price: e.target.value })}
                        className="bg-background/50 border-border/50 w-20 text-center"
                      />
                      <span className="text-muted-foreground text-sm">/mes</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Acceso básico a contenido exclusivo</p>
                </div>

                {/* Tier 2 */}
                <div className="p-4 rounded-xl border border-primary/50 bg-primary/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <span className="text-sm">💖</span>
                      </div>
                      <Input
                        value={pricingData.tier2Name}
                        onChange={(e) => setPricingData({ ...pricingData, tier2Name: e.target.value })}
                        className="bg-transparent border-none font-semibold p-0 h-auto w-32"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={pricingData.tier2Price}
                        onChange={(e) => setPricingData({ ...pricingData, tier2Price: e.target.value })}
                        className="bg-background/50 border-border/50 w-20 text-center"
                      />
                      <span className="text-muted-foreground text-sm">/mes</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Contenido premium + mensajes prioritarios</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">Más popular</span>
                </div>

                {/* Tier 3 */}
                <div className="p-4 rounded-xl border border-accent/50 bg-accent/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                        <span className="text-sm">💎</span>
                      </div>
                      <Input
                        value={pricingData.tier3Name}
                        onChange={(e) => setPricingData({ ...pricingData, tier3Name: e.target.value })}
                        className="bg-transparent border-none font-semibold p-0 h-auto w-32"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={pricingData.tier3Price}
                        onChange={(e) => setPricingData({ ...pricingData, tier3Price: e.target.value })}
                        className="bg-background/50 border-border/50 w-20 text-center"
                      />
                      <span className="text-muted-foreground text-sm">/mes</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Acceso VIP completo + contenido personalizado</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground">
                  <strong>Tu ganancia:</strong> 80% de cada suscripción
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  TTFANS retiene el 20% para procesamiento de pagos y mantenimiento de la plataforma
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Privacy */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Privacidad y Geo-Blocking</h2>
                <p className="text-muted-foreground mt-1">Controla quién puede ver tu contenido</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Bloquear países
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Los usuarios de estos países no podrán ver tu perfil ni tu contenido
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {blockedCountries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => toggleCountry(country.code)}
                        className={cn(
                          "p-2 rounded-lg border text-sm transition-all",
                          privacyData.blockedCountries.includes(country.code)
                            ? "border-destructive bg-destructive/10 text-destructive"
                            : "border-border/50 bg-background/30 text-muted-foreground hover:border-border",
                        )}
                      >
                        {country.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-medium text-foreground">Ocultar de búsqueda</p>
                      <p className="text-xs text-muted-foreground">Tu perfil solo será accesible con link directo</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivacyData({ ...privacyData, hideFromSearch: !privacyData.hideFromSearch })}
                      className={cn(
                        "w-12 h-6 rounded-full transition-all relative",
                        privacyData.hideFromSearch ? "bg-primary" : "bg-muted",
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all",
                          privacyData.hideFromSearch ? "left-6" : "left-0.5",
                        )}
                      />
                    </button>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={handleBack} disabled={currentStep === 1} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </Button>

            {currentStep < 5 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={currentStep === 1 && !isVerificationComplete}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white gap-2"
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleFinish}
                disabled={isLoading}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white gap-2 min-w-[140px]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Finalizar
                    <Check className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
