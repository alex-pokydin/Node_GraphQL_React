import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import graphqlSchema from "./graphql/schema/index.ts";
import graphqlResolvers from "./graphql/resolvers/index.ts";
import authMiddleware from "./middleware/auth.ts";


const app = express();

app.use(bodyParser.json());
app.use(authMiddleware);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
