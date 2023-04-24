import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { collectionId } = req.query;

    if (!collectionId || typeof collectionId !== 'string') {
      throw new Error('Invalid ID');
    }

    const collection = await prisma.collection.findUnique({
      where: {
        id: collectionId,
      },
      include: {
        user: true,
        waitlists: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
      },
    });

    return res.status(200).json(collection);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
