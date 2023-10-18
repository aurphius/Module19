import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const reqBody = await req.json();

    const prisma = new PrismaClient();

    // Example of a transaction; if any one create operation fails,
    // other one will also fail and rollback
    const [product, product_meta] = await prisma.$transaction([
      prisma.product.create({
        data: reqBody,
      }),
      prisma.product_meta.create({
        data: {
          productId: reqBody.id,
          key: `Meta: ${reqBody.metaTitle}`,
          content: `Content: ${reqBody.summary}`,
          createAt: new Date(),
          updateAt: new Date(),
        },
      }),
    ]);

    // create a record in product model
    let result = await prisma.product.create({
      data: reqBody,
    });

    // read a record from product model
    result = await prisma.product.findUnique({
      where: {
        id: 99,
      },
    });

    // update a record in product model
    result = await prisma.product.update({
      where: {
        id: 99,
      },
      data: { metaTitle: "New Meta Title" },
    });

    // delete a record from product model
    result = await prisma.product.delete({
      where: {
        id: 99,
      },
    });

    console.log(product, product_meta);

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
