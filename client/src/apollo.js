import { ApolloClient, InMemoryCache } from "@apollo/client";

//Configuracion basica para conectar con el servidor GraphQL
export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});
