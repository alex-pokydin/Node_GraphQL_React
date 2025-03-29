import { PrismaClient } from '@prisma/client'
import { AuthRequest } from "../../middleware/auth.ts";

const prisma = new PrismaClient();

export default {
  booking: async () => {
    return await prisma.booking.findMany({
      include: {
        event: true,
        user: true,
      },
    });
  },

  bookEvent: (eventId: string, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    return prisma.booking.create({
      data: {
        event: {
          connect: {
            id: eventId,
          },
        },
        user: {
          connect: {
            id: req.userId,
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  cancelBooking: (bookingId: string, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    return prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });
  },
};
