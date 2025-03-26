import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

type EventInput = {
    title: string;
    description: string;
    price: number;
    date: string;
}

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Event {
            id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        schema {
            query: RootQuery,
            mutation: RootMutation
        }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
    `),
    rootValue: {
      events: async () => {
        return await prisma.events.findMany({
            include: {
                creator: true,
            }
        });
      },
      createEvent: async ({ eventInput }: { eventInput: EventInput }) => {
        console.log(eventInput, 'event created');

        const user = await prisma.user.create({
            data: {
                name: 'Alice',
            },
        });

        const event = await prisma.events.create({
            data: {
                title: eventInput.title,
                description: eventInput.description,
                price: +eventInput.price,
                date: new Date(),
                creatorId: user.id,
            }
        });
        console.log(event);
        return event;
      },
    },
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
