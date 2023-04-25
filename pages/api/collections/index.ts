import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;

      const collection = await prisma.collection.create({
        data: {
          name: 'New Collection',
          body,
          userId: currentUser.id
        }
      });

      return res.status(200).json(collection);
    }

    if (req.method === 'GET') {
      const { userId } = req.query;

      console.log({ userId })

      let collections;

      if (userId && typeof userId === 'string') {
        collections = await prisma.collection.findMany({
          where: {
            userId
          },
          include: {
            user: true,
            waitlists: true
          },
          orderBy: {
            createdAt: 'desc'
          },
        });
      } else {
        collections = await prisma.collection.findMany({
          include: {
            waitlists: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
      }

      return res.status(200).json(collections);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}