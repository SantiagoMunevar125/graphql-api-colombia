import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_DEPARTMENTS, GET_DEPARTMENT_WITH_CITIES, GET_CITIES } from "./graphql/queries";

function Panel({ title, children }) {
  return (
    <section style={{
      background: "#fff",
      borderRadius: 16,
      padding: 20,
      boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
      marginBottom: 20
    }}>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const [departmentId, setDepartmentId] = useState("");

  const departmentsQuery = useQuery(GET_DEPARTMENTS);
  const citiesQuery = useQuery(GET_CITIES);
  const departmentDetailQuery = useQuery(GET_DEPARTMENT_WITH_CITIES, {
    variables: { id: departmentId },
    skip: !departmentId
  });

  const departments = departmentsQuery.data?.departments ?? [];
  const cities = citiesQuery.data?.cities ?? [];
  const selectedDepartment = departmentDetailQuery.data?.department ?? null;

  const mappedDepartments = useMemo(() => {
    return departments.slice(0, 10);
  }, [departments]);

  return (
    <main style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: 1100,
      margin: "0 auto",
      padding: 24,
      background: "#f5f7fb",
      minHeight: "100vh"
    }}>
      <h1 style={{ marginTop: 0 }}>GraphQL sobre API Colombia</h1>
      <p>
        Este cliente usa fragments para reutilizar campos y consultar departamentos y ciudades.
      </p>

      <Panel title="1) Lista de departamentos">
        {departmentsQuery.loading && <p>Cargando departamentos...</p>}
        {departmentsQuery.error && <p>Error: {departmentsQuery.error.message}</p>}
        {!departmentsQuery.loading && !departmentsQuery.error && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12
          }}>
            {mappedDepartments.map((department) => (
              <button
                key={department.id}
                onClick={() => setDepartmentId(String(department.id))}
                style={{
                  textAlign: "left",
                  padding: 14,
                  borderRadius: 12,
                  border: "1px solid #d7ddea",
                  background: departmentId === String(department.id) ? "#e8f0ff" : "#fff",
                  cursor: "pointer"
                }}
              >
                <strong>{department.name}</strong>
                <div style={{ fontSize: 13, marginTop: 6, color: "#555" }}>
                  ID: {department.id}
                </div>
              </button>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="2) Departamento con ciudades">
        {!departmentId && <p>Selecciona un departamento para ver sus ciudades.</p>}
        {departmentDetailQuery.loading && <p>Cargando detalle...</p>}
        {departmentDetailQuery.error && <p>Error: {departmentDetailQuery.error.message}</p>}
        {selectedDepartment && (
          <>
            <h3 style={{ marginBottom: 6 }}>{selectedDepartment.name}</h3>
            <p>{selectedDepartment.description || "Sin descripción"}</p>
            <p><strong>Ciudades asociadas:</strong> {selectedDepartment.cities.length}</p>
            <ul>
              {selectedDepartment.cities.slice(0, 12).map((city) => (
                <li key={city.id}>
                  {city.name} {city.population ? `- Población: ${city.population}` : ""}
                </li>
              ))}
            </ul>
          </>
        )}
      </Panel>

      <Panel title="3) Muestra de otra query para ciudades">
        {citiesQuery.loading && <p>Cargando ciudades...</p>}
        {citiesQuery.error && <p>Error: {citiesQuery.error.message}</p>}
        {!citiesQuery.loading && !citiesQuery.error && (
          <ul>
            {cities.slice(0, 10).map((city) => (
              <li key={city.id}>{city.name}</li>
            ))}
          </ul>
        )}
      </Panel>
    </main>
  );
}
