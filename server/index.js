import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import dotenv from "dotenv";
import { schema } from "./schema/sehema.js";
import connectDB from "./config/dbConnect.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//GRAPHQL

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "DEVELOPMENT",
  })
);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(`App is running on port ${PORT}`);
  }
});
