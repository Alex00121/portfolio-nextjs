import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const DEMO_USERS = [
  { id: '1', email: 'admin@demo.com', password: 'admin123', name: 'Alexandre Admin', role: 'admin' },
  { id: '2', email: 'user@demo.com', password: 'user123', name: 'Marie Dupont', role: 'member' },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = DEMO_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        )
        if (!user) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string
        (session.user as { id?: string }).id = token.sub
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-change-in-production',
}
