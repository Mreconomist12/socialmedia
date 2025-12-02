import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/db"

const handler = NextAuth({
  debug: true, // Esto nos mostrará el error real si vuelve a fallar
  adapter: PrismaAdapter(prisma), // <--- ESTO ES VITAL para guardar en Supabase
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id;
      }
      return session;
    }
  },
  
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  }
})

export { handler as GET, handler as POST }