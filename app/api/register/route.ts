// Importing the bcrypt library for password hashing
import bcrypt from "bcrypt"; 
// Importing the Prisma client instance for interacting with the database
import prisma from '@/libs/prismadb'; 
// Importing NextResponse from the Next.js server library
import { NextResponse } from "next/server";

// Handling the POST request
export async function POST(request: Request) {
    // Parsing the JSON body of the request
    const body = await request.json();
    // Extracting name, email, and password from the request body
    const {name, email, password} =body;
    // Hashing the password using bcrypt with a salt factor of 10
    const hashedPassword= await bcrypt.hash (password, 10);

    // Creating a new user in the database using Prisma
    const user= await prisma.user.create({
        data:{
            name,
            email,
            hashedPassword,
        },
    });

    // Returning the user data as a JSON response
    return NextResponse.json(user);
} 