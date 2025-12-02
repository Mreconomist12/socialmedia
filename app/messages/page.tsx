import { ConversationList } from "@/components/chat/conversation-list"
import { BottomNav } from "@/components/navigation/bottom-nav"

export default function MessagesPage() {
  return (
    <main className="min-h-[100dvh] bg-background pb-20">
      <ConversationList />
      <BottomNav />
    </main>
  )
}
