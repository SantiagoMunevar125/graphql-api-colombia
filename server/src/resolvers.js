import {
  getCities,
  getCitiesByDepartmentId,
  getCityById,
  getDepartmentById,
  getDepartments,
  searchCities,
  searchDepartments
} from "./apiColombia.js";

//Convierte valores a enteros
function toInt(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

//Ajuste de los los datos del deparamento para que coincidan con los schemas
function normalizeDepartment(item) {
  return {
    id: item.id,
    name: item.name,
    description: item.description ?? null,
    surface: item.surface ?? null,
    population: item.population ?? null,
    postalCode: item.postalCode ?? null
  };
}

//Ajuste de las datos de la ciudad
function normalizeCity(item) {
  return {
    id: item.id,
    name: item.name,
    description: item.description ?? null,
    surface: item.surface ?? null,
    population: item.population ?? null,
    postalCode: item.postalCode ?? null,
    departmentId: item.departmentId ?? null
  };
}


export const resolvers = {
  Query: {
    //Lista de departamentos 
    departments: async () => {
      const data = await getDepartments();
      return Array.isArray(data) ? data.map(normalizeDepartment) : [];
    },

    //Obtener un departamento por id
    department: async (_, { id }) => {
      const data = await getDepartmentById(id);
      return data ? normalizeDepartment(data) : null;
    },

    //Lista de las ciudades
    cities: async () => {
      const data = await getCities();
      return Array.isArray(data) ? data.map(normalizeCity) : [];
    },

    //Obtener ciudad por ID
    city: async (_, { id }) => {
      const data = await getCityById(id);
      return data ? normalizeCity(data) : null;
    },

    //Busqueda de departamenteos
    departmentsByKeyword: async (_, { keyword }) => {
      const data = await searchDepartments(keyword);
      return Array.isArray(data) ? data.map(normalizeDepartment) : [];
    },

    //Busqueda de ciudades
    citiesByKeyword: async (_, { keyword }) => {
      const data = await searchCities(keyword);
      return Array.isArray(data) ? data.map(normalizeCity) : [];
    }
  },

  Department: {
    //Relacion principal, ya que un departamento tiene varias ciudades
    cities: async (parent) => {
      const id = toInt(parent.id);
      if (id === null) {
        return [];
      }
      const data = await getCitiesByDepartmentId(id);
      return Array.isArray(data) ? data.map(normalizeCity) : [];
    }
  }
};
