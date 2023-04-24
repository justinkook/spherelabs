import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { collectionId } = req.query;

    if (!collectionId || typeof collectionId !== 'string') {
      throw new Error('Invalid ID');
    }

    const waitlist = await prisma.waitlist.create({
      data: {
        userId: currentUser.id,
        collectionId
      }
    });

    // NOTIFICATION PART START
    try {
      const collection = await prisma.collection.findUnique({
        where: {
          id: collectionId,
        }
      });

      if (collection?.userId) {
        await prisma.notification.create({
          data: {
            body: 'Someone replied on your tweet!',
            userId: collection.userId
          }
        });

        await prisma.user.update({
          where: {
            id: collection.userId
          },
          data: {
            hasNotification: true
          }
        });
      }
    }
    catch (error) {
      console.log(error);
    }
    // NOTIFICATION PART END

    return res.status(200).json(waitlist);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}