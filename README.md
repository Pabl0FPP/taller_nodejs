# Taller Node.js

# E-Commerce de Velas Personalizadas: AromaLife

**Autores del proyecto:**

- Alejandro Amu García - A00395686  
- Rafaela Sofía Ruiz Pizarro - A00395368  
- Pablo Fernando Pineda Patiño - A00395831

## Despliegue y Configuración del Proyecto

El proyecto está desplegado en **Vercel** y se puede acceder a través de la siguiente URL:

[https://taller-nodejs-six.vercel.app/](https://taller-nodejs-six.vercel.app/)

Para configurar el proyecto, sigue estos pasos:

1. Clona el repositorio desde GitHub y abre la carpeta del proyecto.  
2. Asegúrate de tener instalado `Node.js` y `yarn`.  
3. Instala las dependencias del proyecto ejecutando:

   ```bash
   yarn install

4. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
PORT=3000
MONGO_URL=mongodb+srv://admin:12345@cluster0.xjpkn.mongodb.net?retrywrites=true&w=majority&appName=Cluster0
JWT_SECRET= "UnaVariableCualquieraUnica"

5. Para ejecutar el proyecto en modo desarrollo, utiliza:
    ```bash
    yarn dev
6. Para generar el código transpilado en la carpeta dist, ejecuta:
    ```bash
    yarn tsc
## Funcionalidades del proyecto
Este proyecto es un API que soporta tanto REST como GraphQL para gestionar un e-commerce de velas personalizadas. Los usuarios pueden registrarse, iniciar sesión, personalizar velas y realizar compras. Los administradores tienen permisos adicionales para gestionar recursos.

## Uso de GraphQL

¿Qué es GraphQL?

GraphQL es un lenguaje de consulta para APIs que permite a los clientes solicitar exactamente los datos que necesitan. En este proyecto, se utiliza para interactuar con los recursos del e-commerce de manera flexible y eficiente.

¿Cómo funciona?

**Endpoint de GraphQL:**
Todas las consultas y mutaciones se realizan a través del endpoint /graphql.

**Esquema:**
El esquema define los tipos de datos, consultas y mutaciones disponibles. Por ejemplo:

- **Consultas (Query):** Obtener datos como usuarios, velas, contenedores, etc.
- **Mutaciones (Mutation):** Crear, actualizar o eliminar recursos.

**Autenticación:**
Algunas consultas y mutaciones requieren un token JWT en el encabezado Authorization.

### Endpoints No Autenticados

Estos endpoints no requieren autenticación:

| Ruta             | Verbo HTTP | Propósito                                                                 |
| ----------------- | ---------- | ------------------------------------------------------------------------- |
| `/auth/register` | POST       | Registrar un nuevo usuario en el sistema.                                 |
| `/auth/login`    | POST       | Iniciar sesión en la plataforma. Devuelve un token de autenticación.      |

### Endpoints Autenticados

Estos endpoints requieren autenticación mediante un token JWT:

#### Gestión de Usuarios

| Ruta         | Verbo HTTP | Propósito                                                                 |
| ------------ | ---------- | ------------------------------------------------------------------------- |
| `/user`      | GET        | Obtener todos los usuarios (solo administradores).                        |
| `/user`      | POST       | Crear un nuevo usuario (solo administradores).                            |
| `/user/:id`  | GET        | Obtener un usuario por su ID (solo administradores).                      |
| `/user/:id`  | PUT        | Actualizar un usuario por su ID (solo administradores).                   |
| `/user/:id`  | DELETE     | Eliminar un usuario por su ID (solo administradores).                     |

#### Gestión de Velas

| Ruta              | Verbo HTTP | Propósito                                                                 |
| ----------------- | ---------- | ------------------------------------------------------------------------- |
| `/candle/candle` | POST       | 	Agregar una vela al carrito del usuario autenticado.         |
| `/candle/candles/:id` | GET    | Obtener una vela específica del carrito del usuario.                      |

#### Gestión del carrito de compras
| Ruta              | Verbo HTTP | Propósito                                                                 |
| ----------------- | ---------- | ------------------------------------------------------------------------- |
| `/cart` | POST       | Crear una vela personalizada y agregarla al carrito del usuario.          |
| `/cart` | GET    | Obtener el carrito de compras del usuario autenticado.                  |

#### Gestión de Contenedores

| Ruta              | Verbo HTTP | Propósito                                                                 |
| ----------------- | ---------- | ------------------------------------------------------------------------- |
| `/container`      | POST       | Crear un nuevo contenedor (solo administradores).                         |
| `/container`      | GET        | Obtener todos los contenedores (solo administradores).                    |
| `/container/:id`  | GET        | Obtener un contenedor por su ID (solo administradores).                   |
| `/container/:id`  | PUT        | Actualizar un contenedor por su ID (solo administradores).                |
| `/container/:id`  | DELETE     | Eliminar un contenedor por su ID (solo administradores).                  |

#### Gestión de Fragancias

| Ruta              | Verbo HTTP | Propósito                                                                 |
| ----------------- | ---------- | ------------------------------------------------------------------------- |
| `/fragance`       | POST       | Crear una nueva fragancia (solo administradores).                         |
| `/fragance`       | GET        | Obtener todas las fragancias (solo administradores).                      |
| `/fragance/:id`   | GET        | Obtener una fragancia por su ID (solo administradores).                   |
| `/fragance/:id`   | PUT        | Actualizar una fragancia por su ID (solo administradores).                |
| `/fragance/:id`   | DELETE     | Eliminar una fragancia por su ID (solo administradores).                  |

## ¿Qué se puede hacer con GraphQL?

## Consultas (Query)

| Consulta                 | Propósito                                                              |
|--------------------------|------------------------------------------------------------------------|
| `users`                  | Obtener todos los usuarios (solo administradores).                     |
| `user(id: ID!)`          | Obtener un usuario por su ID (solo administradores).                   |
| `candles`                | Obtener todas las velas disponibles.                                   |
| `candle(id: ID!)`        | Obtener una vela específica por su ID.                                 |
| `containers`             | Obtener todos los contenedores.                                        |
| `container(id: ID!)`     | Obtener un contenedor específico por su ID.                            |
| `fragances`              | Obtener todas las fragancias disponibles.                              |
| `fragance(id: ID!)`      | Obtener una fragancia específica por su ID.                            |
| `cart`                   | Obtener el carrito de compras del usuario autenticado.                 |

## Mutaciones (Mutation)

| Mutación                                        | Propósito                                                                 |
|------------------------------------------------|--------------------------------------------------------------------------|
| `createUser(input: UserInput!)`                | Crear un nuevo usuario (solo administradores).                          |
| `updateUser(id: ID!, input: UserInput!)`       | Actualizar un usuario por su ID (solo administradores).                 |
| `deleteUser(id: ID!)`                          | Eliminar un usuario por su ID (solo administradores).                   |
| `createCandle(input: CandleInput!)`            | Crear una nueva vela personalizada.                                     |
| `createContainer(input: ContainerInput!)`      | Crear un nuevo contenedor (solo administradores).                       |
| `updateContainer(id: ID!, input: ContainerInput!)` | Actualizar un contenedor por su ID.                                  |
| `deleteContainer(id: ID!)`                     | Eliminar un contenedor por su ID.                                       |
| `createFragance(input: FragranceInput!)`       | Crear una nueva fragancia (solo administradores).                       |
| `updateFragance(id: ID!, input: FragranceInput!)` | Actualizar una fragancia por su ID.                                  |
| `deleteFragance(id: ID!)`                      | Eliminar una fragancia por su ID.                                       |
| `addToCart(input: AddToCartInput!)`            | Agregar una vela al carrito del usuario autenticado.                   |
| `removeFromCart(candleId: ID!)`                | Eliminar una vela del carrito del usuario autenticado.                 |

---

## Ejemplo de Consultas y Mutaciones

## Consulta: Obtener todas las velas

query GetCandles {
  candles {
    id
    id_container
    id_fragance
    image_url
    text
  }
}

## Mutación: Crear una nueva vela

mutation CreateCandle($input: CandleInput!) {
  createCandle(input: $input) {
    id
    id_container
    id_fragance
    image_url
    text
  }
}

## Variables

{
  "input": {
    "id_container": "64a7b2f4e4b0f5a1c2d3e4f6",
    "id_fragance": "64a7b2f4e4b0f5a1c2d3e4f7",
    "image_url": "http://example.com/candle.jpg",
    "text": "Vela aromática de vainilla"
  }
}

¿Cómo ejecutar GraphQL?

1. **Apollo Sandbox:**
Puedes usar Apollo Sandbox para realizar consultas y mutaciones. Configura el endpoint /graphql y comienza a interactuar con el API.

2. **Postman:**
También puedes usar Postman para realizar consultas GraphQL. Configura el método POST y envía el cuerpo de la consulta en formato JSON.



## Conclusiones y Reflexión

Durante el desarrollo del proyecto, enfrentamos desafíos como la integración de **Mongoose** para manejar la base de datos no relacional y la implementación de un sistema de autenticación y roles. Sin embargo, logramos construir un sistema robusto y funcional. Además, la implementación de GraphQL nos permitió ofrecer una API más flexible y eficiente para los clientes. A pesar de contar con algunas dificultades tales como: guardado del id del item y acceso al id del usuario para el guardado del item en el carrito.Logramos construir un sistema robusto y funcional.

## Enlace Postman
https://app.getpostman.com/join-team?invite_code=b7e31ffd847c468a672870f4953353effb0bf212304da6bd7fbafa3ba5c359d2&target_code=d83989d87ff21725eb2f30b37399dd60

