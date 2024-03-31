import { PrismaClient } from "@prisma/client";

// Declaration merging to extend global namespace
declare global {
     // Declaring a variable prisma of type PrismaClient or undefined in the global namespace
    var prisma: PrismaClient | undefined
}

// Initializing the Prisma client instance
const client = globalThis.prisma || new PrismaClient();

// If not in production environment, assign the Prisma client instance to globalThis.prisma
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

// Exporting the Prisma client instance
export default client;