import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const app = express();
const port = process.env.PORT || 4000;

//Servidor GraphQL con el schema y resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers
});

await server.start();

//Middleware para manejar las peticiones GraphQL con CORS y JSON
app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server)
);

//Ruta para verificar que el servidor esta corriendo
app.get("/", (_, res) => {
  res.send("Servidor GraphQL funcionando. Usa /graphql");
});

app.listen(port, () => {
  console.log(`Servidor listo en http://localhost:${port}/graphql`);
});
