//Import necessary files
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/prismadb"
import bcrypt from 'bcrypt'

// Define authentication options
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma), // Using PrismaAdapter with Prisma instance
  providers: [
    // Array of authentication providers
    GoogleProvider({ // Google authentication provider
      clientId: process.env.GOOGLE_CLIENT_ID as string, // Google client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // Google client secret from environment variables
    }),
    CredentialsProvider({// Credentials authentication provider
      name: 'credentials', // Provider name
      credentials: {// Define fields for the credentials (email and password)
        email: {
          label: 'email', // Label for email field
          type: 'text', // Type of email field
        }, 
        password: {
          label: 'password', // Label for password field
          type: 'password', // Type of password field
        },
      },
      async authorize(credentials) {// Async function to authorize user using provided credentials
        if(!credentials?.email || !credentials.password) {// Checking if email and password are provided
          throw new Error('Email and password are required')
        }
          
        // Finding user with provided email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if(!user || !user?.hashedPassword){ // Checking if user or hashed password exists
          throw new Error('Invalid email or password')
        }

        // Comparing provided password with hashed password in the database
        const isCorrectedPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if(!isCorrectedPassword){// If password doesn't match
          throw new Error('Invalid email or password')
        }
        // If authentication successful, return the user object
        return user;
        },
    }),
  ],
  pages:{
    // Customizing sign-in page URL
    signIn: '/login'
  },
  debug: process.env.NODE_ENV == 'development', // Setting debug mode based on environment
  session:{
    // Configuring session strategy
    strategy: 'jwt' // Using JWT strategy
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret used for signing cookies
};

export default NextAuth(authOptions);