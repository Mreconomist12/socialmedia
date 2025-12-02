import { mockCreators } from "./mock-data"

export interface PendingContent {
  id: string
  creatorId: string
  creatorName: string
  creatorAvatar: string
  thumbnail: string
  type: "video" | "image"
  submittedAt: string
  status: "pending" | "approved" | "rejected"
  caption: string
  isExplicit: boolean
}

export interface AdminStats {
  totalRevenue: number
  revenueChange: number
  totalUsers: number
  usersChange: number
  totalCreators: number
  creatorsChange: number
  pendingPayouts: number
  pendingContent: number
}

export interface UserReport {
  id: string
  reportedUser: string
  reportedBy: string
  reason: string
  timestamp: string
  status: "pending" | "reviewed" | "resolved"
}

export const adminStats: AdminStats = {
  totalRevenue: 1245680.5,
  revenueChange: 12.5,
  totalUsers: 158420,
  usersChange: 8.3,
  totalCreators: 2340,
  creatorsChange: 15.2,
  pendingPayouts: 89450.0,
  pendingContent: 23,
}

export const pendingContent: PendingContent[] = [
  {
    id: "pc-1",
    creatorId: "1",
    creatorName: "Sofia Martinez",
    creatorAvatar: "/beautiful-latina-woman-portrait.jpg",
    thumbnail: "/woman-dancing-lifestyle-video-thumbnail-dark.jpg",
    type: "video",
    submittedAt: "2 hours ago",
    status: "pending",
    caption: "New exclusive dance video for my subscribers",
    isExplicit: false,
  },
  {
    id: "pc-2",
    creatorId: "4",
    creatorName: "Mia Rose",
    creatorAvatar: "/redhead-woman-artistic-portrait.jpg",
    thumbnail: "/woman-fashion-photoshoot-glamour-video-thumbnail.jpg",
    type: "image",
    submittedAt: "3 hours ago",
    status: "pending",
    caption: "Behind the scenes photoshoot - premium content",
    isExplicit: true,
  },
  {
    id: "pc-3",
    creatorId: "2",
    creatorName: "Luna Dreams",
    creatorAvatar: "/blonde-woman-glamour-portrait.jpg",
    thumbnail: "/woman-beach-sunset-silhouette-video-thumbnail.jpg",
    type: "video",
    submittedAt: "5 hours ago",
    status: "pending",
    caption: "Sunset beach vibes - exclusive content",
    isExplicit: false,
  },
  {
    id: "pc-4",
    creatorId: "3",
    creatorName: "Valentina",
    creatorAvatar: "/brunette-woman-elegant-portrait.jpg",
    thumbnail: "/woman-fitness-workout-gym-video-thumbnail-dark.jpg",
    type: "video",
    submittedAt: "6 hours ago",
    status: "pending",
    caption: "Full workout routine - subscriber exclusive",
    isExplicit: false,
  },
]

export const userReports: UserReport[] = [
  {
    id: "r-1",
    reportedUser: "spam_account_123",
    reportedBy: "sofia_model",
    reason: "Spam and harassment in DMs",
    timestamp: "1 hour ago",
    status: "pending",
  },
  {
    id: "r-2",
    reportedUser: "fake_profile_xx",
    reportedBy: "mia_exclusive",
    reason: "Impersonating another creator",
    timestamp: "3 hours ago",
    status: "pending",
  },
  {
    id: "r-3",
    reportedUser: "toxic_user_99",
    reportedBy: "luna_dreams",
    reason: "Abusive comments and threats",
    timestamp: "5 hours ago",
    status: "reviewed",
  },
]

export const topCreators = mockCreators.slice(0, 5).map((c) => ({
  ...c,
  monthlyEarnings: c.stats?.thisMonthEarnings || 0,
  totalEarnings: c.stats?.earnings || 0,
}))

export const recentTransactions = [
  { id: "t1", type: "subscription", amount: 19.99, user: "user_12345", creator: "Mia Rose", timestamp: "2 min ago" },
  { id: "t2", type: "tip", amount: 100.0, user: "vip_fan_99", creator: "Sofia Martinez", timestamp: "5 min ago" },
  { id: "t3", type: "ppv", amount: 14.99, user: "new_user_77", creator: "Luna Dreams", timestamp: "12 min ago" },
  { id: "t4", type: "subscription", amount: 9.99, user: "regular_fan", creator: "Valentina", timestamp: "18 min ago" },
  { id: "t5", type: "payout", amount: -500.0, user: "system", creator: "Emma Queen", timestamp: "25 min ago" },
]
