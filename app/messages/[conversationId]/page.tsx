import { mockConversations } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { ChatView } from "@/components/chat/chat-view"

interface ChatPageProps {
  params: Promise<{ conversationId: string }>
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { conversationId } = await params
  const conversation = mockConversations.find((c) => c.id === conversationId)

  if (!conversation) {
    notFound()
  }

  return <ChatView conversation={conversation} />
}
