const BASE_URL = "https://api-colombia.com/api/v1";

//Funcion general para hacer peticiones GET, asi no se repite fetch en cada metodo 
async function request(path) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      console.log("Error en la API:", response.status, path);
      throw new Error(`Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("Fallo en la petición:", error.message);
    throw error;
  }
}

//Obtener todos los departamentos
export function getDepartments() {
  return request("/Department");
}

//Obtener un departamento por su ID
export function getDepartmentById(id) {
  return request(`/Department/${id}`);
}

//Obtener ciudades de un departamento 
export function getCitiesByDepartmentId(id) {
  return request(`/Department/${id}/cities`);
}

//Obtener todas las ciudades
export function getCities() {
  return request("/City");
}

//Obtener una ciudad por id
export function getCityById(id) {
  return request(`/City/${id}`);
}

//Buscar departamentos por palabra clave
export function searchDepartments(keyword) {
  return request(`/Department/search/${encodeURIComponent(keyword)}`);
}

//Buscar ciudades por palabra clave
export function searchCities(keyword) {
  return request(`/City/search/${encodeURIComponent(keyword)}`);
}
