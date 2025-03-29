import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../../middleware/auth.ts";

const prisma = new PrismaClient();

type EventInput = {
  title: string;
  description: string;
  price: number;
  date: string;
};

export default {
  events: async () => {
    return await prisma.event.findMany({
      include: {
        creator: true,
      },
    });
  },

  createEvent: async ({ eventInput }: { eventInput: EventInput }, req: AuthRequest) => {
    
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const event = await prisma.event.create({
      data: {
        title: eventInput.title,
        description: eventInput.description,
        price: +eventInput.price,
        date: new Date(),
        creatorId: user.id,
      },
    });
    return event;
  },
};
