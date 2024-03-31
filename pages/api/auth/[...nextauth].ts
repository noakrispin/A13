import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/prismadb"
import bcrypt from 'bcrypt'



export default NextAuth({
  // Configuration object for NextAuth
    adapter: PrismaAdapter(prisma), // Using PrismaAdapter with Prisma instance
    providers: [
      // Array of authentication providers
      GoogleProvider({ // Google authentication provider
        clientId: process.env.GOOGLE_CLIENT_ID as string, // Google client ID from environment variables
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // Google client secret from environment variables
      }),
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: {
            label: 'email',
            type: 'text',
          },
          password: {
            label: 'password',
            type: 'password',
           },
        },
        async authorize(credentials) {
          if(!credentials?.email || !credentials.password) {
            throw new Error('Email and password are required')
          }
          
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
         })

          if(!user || !user?.hashedPassword){
            throw new Error('Invalid email or password')
           }
          const isCorrectedPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          )

          if(!isCorrectedPassword){
            throw new Error('Invalid email or password')

          }
          return user
        },
     }),
    ],
    pages:{
      signIn: '/login'
    },
    debug: process.env.NODE_ENV == 'development',
    session:{
      strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_URL
  });