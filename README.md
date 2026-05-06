# Proyecto GraphQL - API Colombia

Este proyecto es una implementacion basica de GraphQL usando la API publica de Colombia.
La idea principal fue crear una capa intermedia para consultar datos de departamentos y ciudades.

## Contexto

Se trabajo con dos entidades:

* Departamentos
* Ciudades

Un departamento puede tener varias ciudades, por lo que se manejo una relación entre ambas.

---

## Tecnologias usadas

* Node.js
* Express
* Apollo Server
* GraphQL
* API Colombia (https://api-colombia.com/)

En el cliente también se uso Apollo Client para hacer las consultas.

---

## Como ejecutar el proyecto

### Backend

```bash
cd server
npm install
npm run dev
```

El servidor queda corriendo en:

```
http://localhost:4000/graphql
```

---

### Cliente (opcional)

```bash
cd client
npm install
npm run dev
```

---

## Ejemplo de consulta

```graphql
query {
  department(id: 1) {
    name
    cities {
      name
    }
  }
}
```

---

## Fragments

Se usaron fragments para no repetir campos en las consultas.

Ejemplo:

```graphql
fragment DatosCiudad on City {
  id
  name
}
```
## Repositorio

https://github.com/SantiagoMunevar125/graphql-api-colombia