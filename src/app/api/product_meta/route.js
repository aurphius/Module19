import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const reqBody = await req.json();

    const prisma = new PrismaClient();

    // create a record in product_meta model
    let result = await prisma.product_meta.create({
      data: reqBody,
    });

    // read a record from product_meta model
    result = await prisma.product_meta.findUnique({
      where: {
        id: 99,
      },
    });

    // update a record in product_meta model
    result = await prisma.product_meta.update({
      where: {
        id: id,
      },
      data: { key: "target_group" },
    });

    // delete a record from product_meta model
    result = await prisma.product_meta.delete({
      where: {
        id: 99,
      },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
