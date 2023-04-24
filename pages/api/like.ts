import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { collectionId } = req.body;

    const { currentUser } = await serverAuth(req, res);

    if (!collectionId || typeof collectionId !== 'string') {
      throw new Error('Invalid ID');
    }

    const collection = await prisma.collection.findUnique({
      where: {
        id: collectionId
      }
    });

    if (!collection) {
      throw new Error('Invalid ID');
    }

    let updatedLikedIds = [...(collection.likedIds || [])];

    if (req.method === 'POST') {
      updatedLikedIds.push(currentUser.id);
      
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
              body: 'Someone liked your tweet!',
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
      } catch(error) {
        console.log(error);
      }
      // NOTIFICATION PART END
    }

    if (req.method === 'DELETE') {
      updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser?.id);
    }

    const updatedCollection = await prisma.collection.update({
      where: {
        id: collectionId
      },
      data: {
        likedIds: updatedLikedIds
      }
    });

    return res.status(200).json(updatedCollection);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}