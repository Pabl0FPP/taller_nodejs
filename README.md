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
Este proyecto es un API RESTful para gestionar un e-commerce de velas personalizadas. Los usuarios pueden registrarse, iniciar sesión, personalizar velas y realizar compras. Los administradores tienen permisos adicionales para gestionar recursos.

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

## Conclusiones y Reflexión

Durante el desarrollo del proyecto, enfrentamos desafíos como la integración de **Mongoose** para manejar la base de datos no relacional y la implementación de un sistema de autenticación y roles. Sin embargo, logramos construir un sistema robusto y funcional.

