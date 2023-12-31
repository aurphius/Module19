import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const reqBody = await req.json();

    const prisma = new PrismaClient();

    // create a record in product_review model
    let result = await prisma.product_review.create({
      data: reqBody,
    });

    // read a record from product_review model
    result = await prisma.product_review.findUnique({
      where: {
        id: 99,
      },
    });

    // update a record in product_review model
    result = await prisma.product_review.update({
      where: {
        id: id,
      },
      data: { rating: "Excellent!" },
    });

    // delete a record from product_review model
    result = await prisma.product_review.delete({
      where: {
        id: 99,
      },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
