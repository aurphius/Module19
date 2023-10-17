import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const reqBody = await req.json();

    const prisma = new PrismaClient();

    // create a record in order model
    let result = await prisma.order.create({
      data: reqBody,
    });

    // read a record from order model
    result = await prisma.order.findUnique({
      where: {
        id: 99,
      },
    });

    // update a record in order model
    result = await prisma.order.update({
      where: {
        id: id,
      },
      data: { content: "Updated title" },
    });

    // delete a record from order model
    result = await prisma.order.delete({
      where: {
        id: 99,
      },
    });

    // average order amount of each user
    result = await prisma.order.groupBy({
      by: ["userId"],
      _avg: {
        grandTotal: true,
      },
    });

    // total count of order by each user
    result = await prisma.order.groupBy({
      by: ["userId"],
      _count: {
        id: true,
      },
    });

    // total tax paid by an individual user
    result = await prisma.order.aggregate({
      _sum: {
        tax: true,
      },
      where: {
        userId: 99,
      },
    });

    // find max discount availed by each user
    result = await prisma.order.groupBy({
      by: ["userId"],
      _max: {
        discount: true,
      },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
