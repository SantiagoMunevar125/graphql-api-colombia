import { gql } from "@apollo/client";

// Fragmento para no repetir los datos del departamento 
export const DEPARTMENTS_FIELDS = gql`
  fragment DepartmentFields on Department {
    id
    name
    description
  }
`;

// Fragmento para reutilizar los datos de la ciudad
export const CITIES_FIELDS = gql`
  fragment CityFields on City {
    id
    name
    description
    population
  }
`;