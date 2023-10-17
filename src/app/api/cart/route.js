import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const reqBody = await req.json();

    const prisma = new PrismaClient();

    // create a record in cart model
    let result = await prisma.cart.create({
      data: reqBody,
    });

    // read a record from cart model
    result = await prisma.cart.findUnique({
      where: {
        id: 99,
      },
    });

    // update a record in cart model
    result = await prisma.cart.update({
      where: {
        id: id,
      },
      data: { city: "Dhaka" },
    });

    // delete a record from cart model
    result = await prisma.cart.delete({
      where: {
        id: 99,
      },
    });

    // group cart by the country
    result = await prisma.cart.groupBy({
      by: "country",
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
