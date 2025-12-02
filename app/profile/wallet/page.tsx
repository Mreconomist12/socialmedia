import { mockCreators } from "@/lib/mock-data"
import { WalletDashboard } from "@/components/profile/wallet-dashboard"
import { BottomNav } from "@/components/navigation/bottom-nav"

export default function WalletPage() {
  // In a real app, this would come from auth context
  const creator = mockCreators[3] // Mia Rose as example

  return (
    <main className="min-h-[100dvh] bg-background pb-20">
      <WalletDashboard creator={creator} />
      <BottomNav />
    </main>
  )
}
