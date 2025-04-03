import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import graphqlSchema from "./graphql/schema/index.ts";
import graphqlResolvers from "./graphql/resolvers/index.ts";
import authMiddleware from "./middleware/auth.ts";

const app = express();

app.use(bodyParser.json());

// Middleware to handle CORS
app.use(((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
}) as RequestHandler);

app.use(authMiddleware);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

app.listen(3100, () => {
  console.log("Server is running on port 3100");
});
