"use strict";
const jwt = require('jsonwebtoken');
// Cambia 'UnaVariableCualquieraUnica' por el valor de JWT_SECRET en tu archivo .env
const secret = 'UnaVariableCualquieraUnica';
const token = jwt.sign({ id: '12345', roles: ['admin'] }, // Payload con el ID y roles del usuario
secret, // Secret para firmar el token
{ expiresIn: '1h' } // Opciones: el token expira en 1 hora
);
console.log("Generated Token:", token);
