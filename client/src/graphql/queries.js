import { gql } from "@apollo/client";
import { DEPARTMENTS_FIELDS, CITIES_FIELDS } from "./fragments";

//Consulta simple para listar los departamentos 
export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      ...DepartmentFields
    }
  }
  ${DEPARTMENTS_FIELDS}
`;

//Consulta principal un departamento con sus ciudades
export const GET_DEPARTMENT_WITH_CITIES = gql`
  query GetDepartmentWithCities($id: ID!) {
    department(id: $id) {
      ...DepartmentFields
      surface
      population
      postalCode
      cities {
        ...CityFields
        postalCode
        departmentId
      }
    }
  }
  ${DEPARTMENTS_FIELDS}
  ${CITIES_FIELDS}
`;

//Consulta general de las ciudades
export const GET_CITIES = gql`
  query GetCities {
    cities {
      ...CityFields
      postalCode
      departmentId
    }
  }
  ${CITIES_FIELDS}
`;