import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role != 'ADMIN'){
    return NextResponse.error()
  }

  const body = await request.json();
  const { name, description, Size, price, Artist_Name, category, inStock, Image } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      Size,
      price: parseFloat(price),
      Artist_Name,
      category,
      inStock,
      Image,
    },
  });

  return NextResponse.json(product);
}

export async function PUT(request: Request) {

  const body = await request.json();
  const { id, inStock } = body;

  const product = await prisma.product.update({
    where: { id: id },
    data: { inStock },
  });

  return NextResponse.json(product);
}
