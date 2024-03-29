import Stripe from 'stripe'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: '2020-08-27',
// })