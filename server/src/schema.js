export const typeDefs = `#graphql
# Representa un departamento de Colombia
  type Department {
    id: ID!
    name: String!
    description: String
    surface: Float
    population: Int
    postalCode: String
    cities: [City!]!
  }

  # Representa una ciudad
  type City {
    id: ID!
    name: String!
    description: String
    surface: Float
    population: Int
    postalCode: String
    departmentId: Int
  }

  type Query {
    departments: [Department!]!
    department(id: ID!): Department
    cities: [City!]!
    city(id: ID!): City
    departmentsByKeyword(keyword: String!): [Department!]!
    citiesByKeyword(keyword: String!): [City!]!
  }
`;
