export interface Creator {
  id: string
  username: string
  displayName: string
  avatar: string
  banner?: string
  bio?: string
  isVerified: boolean
  subscriberCount: number
  subscriptionPrice: number
  totalLikes?: number
  totalVideos?: number
  socialLinks?: {
    instagram?: string
    twitter?: string
    tiktok?: string
  }
  stats?: {
    earnings: number
    pendingBalance: number
    totalWithdrawn: number
    thisMonthEarnings: number
  }
}

export interface Video {
  id: string
  creator: Creator
  videoUrl: string
  thumbnail: string
  caption: string
  likes: number
  comments: number
  shares: number
  isLocked: boolean
  price?: number
  isLiked?: boolean
  isFollowing?: boolean
  createdAt?: string
  views?: number
  tags: string[]
  category: string
}

export const categories = [
  { id: "all", name: "Todos", icon: "🔥" },
  { id: "dance", name: "Baile", icon: "💃" },
  { id: "fitness", name: "Fitness", icon: "💪" },
  { id: "fashion", name: "Moda", icon: "👗" },
  { id: "travel", name: "Viajes", icon: "✈️" },
  { id: "lifestyle", name: "Lifestyle", icon: "🌟" },
  { id: "asmr", name: "ASMR", icon: "🎧" },
  { id: "cosplay", name: "Cosplay", icon: "🎭" },
]

export const trendingHashtags = [
  { tag: "dance", count: 125400 },
  { tag: "fitness", count: 98200 },
  { tag: "exclusive", count: 87600 },
  { tag: "behindthescenes", count: 76300 },
  { tag: "fashion", count: 65800 },
  { tag: "travel", count: 54200 },
  { tag: "model", count: 48900 },
  { tag: "lifestyle", count: 42100 },
  { tag: "photoshoot", count: 38500 },
  { tag: "beach", count: 35200 },
]

export interface UserPreferences {
  likedTags: Record<string, number>
  likedCategories: Record<string, number>
  followedCreators: string[]
  viewedVideos: string[]
}

export const mockUserPreferences: UserPreferences = {
  likedTags: {
    dance: 15,
    fitness: 8,
    fashion: 12,
    travel: 5,
  },
  likedCategories: {
    dance: 20,
    fashion: 15,
    fitness: 10,
  },
  followedCreators: ["1", "3"], // Sofia y Valentina
  viewedVideos: ["1", "2", "3"],
}

export const mockCreators: Creator[] = [
  {
    id: "1",
    username: "sofia_model",
    displayName: "Sofia Martinez",
    avatar: "/beautiful-latina-woman-portrait.jpg",
    banner: "/woman-dancing-lifestyle-video-dark.jpg",
    bio: "Professional model & dancer. Sharing my journey with you. Subscribe for exclusive behind-the-scenes content.",
    isVerified: true,
    subscriberCount: 12400,
    subscriptionPrice: 9.99,
    totalLikes: 245000,
    totalVideos: 127,
    socialLinks: {
      instagram: "sofia_model",
      twitter: "sofiamodel",
      tiktok: "sofia.model",
    },
    stats: {
      earnings: 45230.5,
      pendingBalance: 3420.0,
      totalWithdrawn: 41810.5,
      thisMonthEarnings: 8920.0,
    },
  },
  {
    id: "2",
    username: "luna_dreams",
    displayName: "Luna Dreams",
    avatar: "/blonde-woman-glamour-portrait.jpg",
    banner: "/woman-beach-sunset-silhouette.jpg",
    bio: "Beach lover & travel enthusiast. Daily content for my subscribers.",
    isVerified: true,
    subscriberCount: 8200,
    subscriptionPrice: 14.99,
    totalLikes: 156000,
    totalVideos: 89,
    socialLinks: {
      instagram: "lunadreams",
      twitter: "luna_dreams",
    },
    stats: {
      earnings: 28450.0,
      pendingBalance: 2100.0,
      totalWithdrawn: 26350.0,
      thisMonthEarnings: 5840.0,
    },
  },
  {
    id: "3",
    username: "valentina_vip",
    displayName: "Valentina",
    avatar: "/brunette-woman-elegant-portrait.jpg",
    banner: "/woman-fitness-workout-gym-dark.jpg",
    bio: "Fitness coach & lifestyle creator. Let me help you reach your goals!",
    isVerified: false,
    subscriberCount: 3500,
    subscriptionPrice: 5.99,
    totalLikes: 42000,
    totalVideos: 45,
    socialLinks: {
      instagram: "valentina_vip",
    },
    stats: {
      earnings: 8920.0,
      pendingBalance: 890.0,
      totalWithdrawn: 8030.0,
      thisMonthEarnings: 1560.0,
    },
  },
  {
    id: "4",
    username: "mia_exclusive",
    displayName: "Mia Rose",
    avatar: "/redhead-woman-artistic-portrait.jpg",
    banner: "/woman-fashion-photoshoot-glamour.jpg",
    bio: "Fashion & glamour content. Premium photoshoots weekly. DM for collabs.",
    isVerified: true,
    subscriberCount: 25000,
    subscriptionPrice: 19.99,
    totalLikes: 520000,
    totalVideos: 234,
    socialLinks: {
      instagram: "miarose",
      twitter: "mia_exclusive",
      tiktok: "mia.rose",
    },
    stats: {
      earnings: 125680.0,
      pendingBalance: 8450.0,
      totalWithdrawn: 117230.0,
      thisMonthEarnings: 18920.0,
    },
  },
  {
    id: "5",
    username: "emma_queen",
    displayName: "Emma Queen",
    avatar: "/asian-woman-fashion-portrait.jpg",
    banner: "/woman-travel-adventure-lifestyle.jpg",
    bio: "World traveler sharing my adventures. Join me on my journey!",
    isVerified: true,
    subscriberCount: 18700,
    subscriptionPrice: 12.99,
    totalLikes: 380000,
    totalVideos: 178,
    socialLinks: {
      instagram: "emmaqueen",
      twitter: "emma_queen",
    },
    stats: {
      earnings: 78450.0,
      pendingBalance: 5230.0,
      totalWithdrawn: 73220.0,
      thisMonthEarnings: 12340.0,
    },
  },
  {
    id: "6",
    username: "carmen_hot",
    displayName: "Carmen Rodriguez",
    avatar: "/spanish-woman-sensual-portrait.jpg",
    banner: "/woman-flamenco-dance-artistic.jpg",
    bio: "Flamenco dancer & content creator. Passion in every move.",
    isVerified: true,
    subscriberCount: 15600,
    subscriptionPrice: 11.99,
    totalLikes: 198000,
    totalVideos: 156,
    socialLinks: {
      instagram: "carmen_hot",
    },
    stats: {
      earnings: 56780.0,
      pendingBalance: 4200.0,
      totalWithdrawn: 52580.0,
      thisMonthEarnings: 9450.0,
    },
  },
  {
    id: "7",
    username: "yuki_kawaii",
    displayName: "Yuki",
    avatar: "/japanese-woman-cute-portrait-cosplay.jpg",
    banner: "/anime-cosplay-girl-colorful.jpg",
    bio: "Cosplayer & gamer. Bringing your favorite characters to life!",
    isVerified: true,
    subscriberCount: 22300,
    subscriptionPrice: 15.99,
    totalLikes: 445000,
    totalVideos: 203,
    socialLinks: {
      instagram: "yuki_kawaii",
      tiktok: "yuki.kawaii",
    },
    stats: {
      earnings: 98450.0,
      pendingBalance: 7800.0,
      totalWithdrawn: 90650.0,
      thisMonthEarnings: 14200.0,
    },
  },
]

export const mockVideos: Video[] = [
  {
    id: "1",
    creator: mockCreators[0],
    videoUrl: "/woman-dancing-lifestyle-video-dark.jpg",
    thumbnail: "/woman-dancing-lifestyle-video-dark.jpg",
    caption: "New dance routine. Check my exclusive content for the full version.",
    likes: 15420,
    comments: 342,
    shares: 89,
    isLocked: false,
    isLiked: false,
    isFollowing: true, // Usuario sigue a Sofia
    createdAt: "2025-01-28",
    views: 45200,
    tags: ["dance", "routine", "exclusive", "lifestyle"],
    category: "dance",
  },
  {
    id: "2",
    creator: mockCreators[1],
    videoUrl: "/woman-beach-sunset-silhouette.jpg",
    thumbnail: "/woman-beach-sunset-silhouette.jpg",
    caption: "Sunset vibes. Subscribe for exclusive beach content.",
    likes: 8934,
    comments: 156,
    shares: 45,
    isLocked: true,
    price: 4.99,
    isLiked: true,
    isFollowing: false,
    createdAt: "2025-01-27",
    views: 28400,
    tags: ["beach", "sunset", "travel", "vibes"],
    category: "travel",
  },
  {
    id: "3",
    creator: mockCreators[2],
    videoUrl: "/woman-fitness-workout-gym-dark.jpg",
    thumbnail: "/woman-fitness-workout-gym-dark.jpg",
    caption: "Morning workout routine. DM for personalized plans!",
    likes: 5621,
    comments: 89,
    shares: 23,
    isLocked: false,
    isLiked: false,
    isFollowing: true, // Usuario sigue a Valentina
    createdAt: "2025-01-26",
    views: 18900,
    tags: ["fitness", "workout", "gym", "morning", "routine"],
    category: "fitness",
  },
  {
    id: "4",
    creator: mockCreators[3],
    videoUrl: "/woman-fashion-photoshoot-glamour.jpg",
    thumbnail: "/woman-fashion-photoshoot-glamour.jpg",
    caption: "Behind the scenes. Full photoshoot available for subscribers only.",
    likes: 32100,
    comments: 567,
    shares: 234,
    isLocked: true,
    price: 9.99,
    isLiked: false,
    isFollowing: false,
    createdAt: "2025-01-25",
    views: 89500,
    tags: ["fashion", "photoshoot", "behindthescenes", "glamour", "model"],
    category: "fashion",
  },
  {
    id: "5",
    creator: mockCreators[4],
    videoUrl: "/woman-travel-adventure-lifestyle.jpg",
    thumbnail: "/woman-travel-adventure-lifestyle.jpg",
    caption: "Travel diary. Swipe up to see where I went!",
    likes: 19800,
    comments: 423,
    shares: 156,
    isLocked: false,
    isLiked: true,
    isFollowing: false,
    createdAt: "2025-01-24",
    views: 67300,
    tags: ["travel", "adventure", "lifestyle", "diary"],
    category: "travel",
  },
  {
    id: "6",
    creator: mockCreators[5],
    videoUrl: "/woman-flamenco-dance-artistic-red-dress.jpg",
    thumbnail: "/woman-flamenco-dance-artistic-red-dress.jpg",
    caption: "Flamenco night. The passion runs through my veins.",
    likes: 24500,
    comments: 478,
    shares: 189,
    isLocked: false,
    isLiked: false,
    isFollowing: false,
    createdAt: "2025-01-28",
    views: 72300,
    tags: ["dance", "flamenco", "passion", "art", "spanish"],
    category: "dance",
  },
  {
    id: "7",
    creator: mockCreators[6],
    videoUrl: "/anime-cosplay-girl-colorful-kawaii.jpg",
    thumbnail: "/anime-cosplay-girl-colorful-kawaii.jpg",
    caption: "New cosplay reveal! Guess the character.",
    likes: 45200,
    comments: 892,
    shares: 345,
    isLocked: true,
    price: 7.99,
    isLiked: false,
    isFollowing: false,
    createdAt: "2025-01-28",
    views: 125000,
    tags: ["cosplay", "anime", "kawaii", "gaming", "reveal"],
    category: "cosplay",
  },
  {
    id: "8",
    creator: mockCreators[0],
    videoUrl: "/woman-salsa-dance-partner-night-club.jpg",
    thumbnail: "/woman-salsa-dance-partner-night-club.jpg",
    caption: "Salsa night with my dance partner. Full video coming soon!",
    likes: 18900,
    comments: 267,
    shares: 78,
    isLocked: false,
    isLiked: false,
    isFollowing: true,
    createdAt: "2025-01-27",
    views: 52100,
    tags: ["dance", "salsa", "night", "partner"],
    category: "dance",
  },
  {
    id: "9",
    creator: mockCreators[2],
    videoUrl: "/woman-yoga-beach-sunset-peaceful.jpg",
    thumbnail: "/woman-yoga-beach-sunset-peaceful.jpg",
    caption: "Yoga al atardecer. Mind, body, soul.",
    likes: 7890,
    comments: 134,
    shares: 56,
    isLocked: true,
    price: 3.99,
    isLiked: false,
    isFollowing: true,
    createdAt: "2025-01-26",
    views: 21400,
    tags: ["fitness", "yoga", "beach", "sunset", "wellness"],
    category: "fitness",
  },
  {
    id: "10",
    creator: mockCreators[3],
    videoUrl: "/woman-lingerie-fashion-dark-aesthetic.jpg",
    thumbnail: "/woman-lingerie-fashion-dark-aesthetic.jpg",
    caption: "New collection preview. Exclusive for subscribers.",
    likes: 56700,
    comments: 1230,
    shares: 456,
    isLocked: true,
    price: 14.99,
    isLiked: false,
    isFollowing: false,
    createdAt: "2025-01-25",
    views: 145000,
    tags: ["fashion", "exclusive", "preview", "collection"],
    category: "fashion",
  },
]

export function getFollowingFeed(userPreferences: UserPreferences): Video[] {
  return mockVideos
    .filter((video) => userPreferences.followedCreators.includes(video.creator.id))
    .sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime())
}

export function getForYouFeed(userPreferences: UserPreferences): Video[] {
  // Excluir videos de creadoras que ya sigue
  const newCreatorVideos = mockVideos.filter((video) => !userPreferences.followedCreators.includes(video.creator.id))

  // Calcular score de relevancia basado en preferencias
  const scoredVideos = newCreatorVideos.map((video) => {
    let score = 0

    // Score por tags que le gustan
    video.tags.forEach((tag) => {
      if (userPreferences.likedTags[tag]) {
        score += userPreferences.likedTags[tag] * 2
      }
    })

    // Score por categoría preferida
    if (userPreferences.likedCategories[video.category]) {
      score += userPreferences.likedCategories[video.category] * 3
    }

    // Boost para contenido nuevo (últimas 48h)
    const daysSinceCreation = (Date.now() - new Date(video.createdAt || "").getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceCreation < 2) score += 20

    // Boost por engagement (likes/views ratio)
    const engagementRate = video.likes / (video.views || 1)
    score += engagementRate * 100

    // Penalizar videos ya vistos
    if (userPreferences.viewedVideos.includes(video.id)) {
      score -= 50
    }

    return { video, score }
  })

  // Ordenar por score y mezclar un poco de aleatoriedad para variedad
  return scoredVideos.sort((a, b) => b.score - a.score + (Math.random() - 0.5) * 10).map((item) => item.video)
}

export function getVideosByHashtag(hashtag: string): Video[] {
  const normalizedTag = hashtag.toLowerCase().replace("#", "")
  return mockVideos.filter((video) => video.tags.some((tag) => tag.toLowerCase() === normalizedTag))
}

export function getVideosByCategory(categoryId: string): Video[] {
  if (categoryId === "all") return mockVideos
  return mockVideos.filter((video) => video.category === categoryId)
}

export function getCreatorVideos(creatorId: string): Video[] {
  return mockVideos.filter((v) => v.creator.id === creatorId)
}

export function generateCreatorContent(creator: Creator): Video[] {
  const baseVideos = getCreatorVideos(creator.id)
  const additionalVideos: Video[] = Array.from({ length: 9 }, (_, i) => ({
    id: `${creator.id}-extra-${i}`,
    creator,
    videoUrl: creator.banner || "/placeholder.svg",
    thumbnail: creator.banner || "/placeholder.svg",
    caption: `Exclusive content #${i + 1}`,
    likes: Math.floor(Math.random() * 10000) + 1000,
    comments: Math.floor(Math.random() * 500) + 50,
    shares: Math.floor(Math.random() * 100) + 10,
    isLocked: i % 3 === 0,
    price: i % 3 === 0 ? [4.99, 9.99, 14.99][i % 3] : undefined,
    createdAt: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
    views: Math.floor(Math.random() * 50000) + 5000,
    tags: ["exclusive", "content"],
    category: "lifestyle",
  }))
  return [...baseVideos, ...additionalVideos]
}

export interface Message {
  id: string
  senderId: string
  content: string
  type: "text" | "image" | "ppv" | "tip"
  timestamp: string
  isRead: boolean
  ppvPrice?: number
  ppvUnlocked?: boolean
  tipAmount?: number
  imageUrl?: string
}

export interface Conversation {
  id: string
  participant: Creator
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: Message[]
}

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participant: mockCreators[0],
    lastMessage: "Thanks for subscribing! Check your DMs for a special surprise...",
    lastMessageTime: "2 min",
    unreadCount: 2,
    messages: [
      {
        id: "m1",
        senderId: mockCreators[0].id,
        content: "Hey! Thanks for subscribing to my content!",
        type: "text",
        timestamp: "10:30 AM",
        isRead: true,
      },
      {
        id: "m2",
        senderId: "user",
        content: "Love your content! You are amazing",
        type: "text",
        timestamp: "10:32 AM",
        isRead: true,
      },
      {
        id: "m3",
        senderId: mockCreators[0].id,
        content: "Thank you so much! Here is something special just for you...",
        type: "text",
        timestamp: "10:33 AM",
        isRead: true,
      },
      {
        id: "m4",
        senderId: mockCreators[0].id,
        content: "Exclusive behind the scenes content",
        type: "ppv",
        timestamp: "10:34 AM",
        isRead: false,
        ppvPrice: 14.99,
        ppvUnlocked: false,
        imageUrl: "/woman-fashion-photoshoot-glamour.jpg",
      },
    ],
  },
  {
    id: "conv-2",
    participant: mockCreators[3],
    lastMessage: "I just posted new content, check it out!",
    lastMessageTime: "1 hour",
    unreadCount: 0,
    messages: [
      {
        id: "m5",
        senderId: mockCreators[3].id,
        content: "Welcome to my exclusive chat!",
        type: "text",
        timestamp: "Yesterday",
        isRead: true,
      },
      {
        id: "m6",
        senderId: "user",
        content: "Hi! Big fan of your work",
        type: "text",
        timestamp: "Yesterday",
        isRead: true,
      },
      {
        id: "m7",
        senderId: mockCreators[3].id,
        content: "I just posted new content, check it out!",
        type: "text",
        timestamp: "1 hour ago",
        isRead: true,
      },
    ],
  },
  {
    id: "conv-3",
    participant: mockCreators[1],
    lastMessage: "Thank you for the tip! You are the best",
    lastMessageTime: "3 hours",
    unreadCount: 1,
    messages: [
      {
        id: "m8",
        senderId: "user",
        content: "Here is a little something for you",
        type: "tip",
        timestamp: "3 hours ago",
        isRead: true,
        tipAmount: 25,
      },
      {
        id: "m9",
        senderId: mockCreators[1].id,
        content: "Thank you for the tip! You are the best",
        type: "text",
        timestamp: "3 hours ago",
        isRead: false,
      },
    ],
  },
]
