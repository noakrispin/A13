import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser"


// Handler for PUT requests
export async function PUT(request: Request) {

    const currentUser= await getCurrentUser();

    if(!currentUser || currentUser.role!='ADMIN'){
        return NextResponse.error();
    }

    // Parse request body
    const body = await request.json();
    const { id, deliveryStatus } = body;

    // Update the product with the provided ID using Prisma
    const order = await prisma.order.update({
        where: { id: id },
        data: { deliveryStatus },
    });
    // Return the updated product as JSON response
    return NextResponse.json(order);
}
