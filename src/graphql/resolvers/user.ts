import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

type UserInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = { email: string; password: string };

export default {
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

  login: async ({ email, password }: LoginInput): Promise<authPayload> => {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error("Password is incorrect");
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, "somesupersecretkey", {
      expiresIn: "1h",
    });

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};
