import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        schema {
            query: RootQuery,
            mutation: RootMutation
        }
        type RootQuery {
            events: [String!]!
        }
        type RootMutation {
            createEvent(name: String): String
        }
    `),
    rootValue: {
      events: () => {
        return ["Designing", "Programming", "Resting"];
      },
      createEvent: ({ name }: { name: string }) => {
        console.log(name, 'event created');
        return name;
      },
    },
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
