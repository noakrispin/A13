import { User } from "@prisma/client";

// Define SafeUser type by extending User type and omitting certain properties
export type SafeUser = Omit<User, "createdAt" | "updateAt" | "emailVerified"> & {
    // Re-define omitted properties with altered types
    createdAt: string;
    updateAt: string;
    emailVerified: string | null;
};
