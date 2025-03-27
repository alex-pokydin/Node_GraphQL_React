import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type EventInput = {
  title: string;
  description: string;
  price: number;
  date: string;
};

type UserInput = {
  name: string;
  email: string;
  password: string;
};

export default {
  events: async () => {
    return await prisma.event.findMany({
      include: {
        creator: true,
      },
    });
  },
  booking: async () => {
    return await prisma.booking.findMany({
      include: {
        event: true,
        user: true,
      },
    });
  },

  createEvent: async ({ eventInput }: { eventInput: EventInput }) => {
    console.log(eventInput, "event created");

    const user = await prisma.user.findFirst();

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
    console.log(event);
    return event;
  },

  createUser: async ({ userInput }: { userInput: UserInput }) => {
    let user = await prisma.user.findFirst({
      where: {
        email: userInput.email,
      },
    });

    if (user) {
      throw new Error("User already exists");
    }

    user = await prisma.user.create({
      data: {
        name: userInput.name,
        email: userInput.email,
        password: await bcrypt.hash(userInput.password, 1234567890),
      },
    });
    return { ...user, password: null };
  },

  bookEvent: (eventId: string) => {
    return prisma.booking.create({
      data: {
        event: {
          connect: {
            id: eventId,
          },
        },
        user: {
          connect: {
            id: "1",
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  cancelBooking: (bookingId: string) => {
    return prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });
  },
};
