import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const body = await request.json();
  const { name, description, size, price, artistName, category, inStock, image } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      size,
      price: parseFloat(price),
      artistName,
      category,
      inStock,
      image,
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
