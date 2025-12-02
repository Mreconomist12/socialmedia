"use client"

import { Home, Search, PlusSquare, MessageCircle, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
// 1. Importamos el hook para saber si hay sesión
import { useSession } from "next-auth/react"

const navItems = [
  { href: "/", icon: Home, label: "Inicio" },
  { href: "/explore", icon: Search, label: "Descubrir" },
  { href: "/create", icon: PlusSquare, label: "Crear", special: true },
  { href: "/messages", icon: MessageCircle, label: "Mensajes" },
  { href: "/profile", icon: User, label: "Perfil" },
]

export function BottomNav() {
  const pathname = usePathname()
  // 2. Obtenemos los datos de la sesión actual
  const { data: session } = useSession()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-glass-border pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          const Icon = item.icon

          if (item.special) {
            return (
              <Link key={item.href} href={item.href} className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-cyan">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 transition-all",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {/* 3. AQUÍ ESTÁ LA MAGIA: Si es perfil y hay sesión, muestra la foto */}
              {item.label === "Perfil" && session?.user?.image ? (
                 <img 
                    src={session.user.image} 
                    alt="Perfil" 
                    className={cn(
                        "w-6 h-6 rounded-full object-cover border border-white/20",
                        isActive && "ring-2 ring-primary"
                    )}
                 />
              ) : (
                 <Icon className={cn("w-6 h-6", isActive && "glow-cyan")} />
              )}
              
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}