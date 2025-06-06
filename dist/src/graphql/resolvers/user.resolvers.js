"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const user_service_1 = require("../../services/user.service");
exports.userResolvers = {
    Query: {
        users: (_root, _params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user || !context.user.roles.includes('admin')) {
                    throw new Error('No autorizado');
                }
                const users = yield user_service_1.userService.getUsers();
                return users.map(user => {
                    var _a;
                    return (Object.assign(Object.assign({}, user.toObject()), { id: user.id.toString(), role: ((_a = user.roles[0]) === null || _a === void 0 ? void 0 : _a.name) || "client" }));
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Query users:', error.message);
                }
                else {
                    console.error('Error desconocido en Query users:', error);
                }
                throw new Error('Error al obtener los usuarios');
            }
        }),
        user: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                if (!context.user)
                    throw new Error('No autenticado');
                const user = yield user_service_1.userService.findById(params.id);
                if (!user)
                    throw new Error('Usuario no encontrado');
                return Object.assign(Object.assign({}, user.toObject()), { id: user.id.toString(), role: ((_a = user.roles[0]) === null || _a === void 0 ? void 0 : _a.name) || "client" });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Query user:', error.message);
                }
                else {
                    console.error('Error desconocido en Query user:', error);
                }
                throw new Error('Error al obtener el usuario');
            }
        }),
    },
    Mutation: {
        createUser: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                if (!context.user || !context.user.roles.includes('admin')) {
                    throw new Error('No autorizado');
                }
                const user = yield user_service_1.userService.createUser(params.input);
                return Object.assign(Object.assign({}, user.toObject()), { id: user.id.toString(), role: ((_a = user.roles[0]) === null || _a === void 0 ? void 0 : _a.name) || null });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Mutation createUser:', error.message);
                }
                else {
                    console.error('Error desconocido en Mutation createUser:', error);
                }
                throw new Error('Error al crear el usuario');
            }
        }),
        updateUser: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                if (!context.user || !context.user.roles.includes('admin')) {
                    throw new Error('No autorizado');
                }
                const user = yield user_service_1.userService.updateUser(params.id, params.input);
                if (!user)
                    throw new Error('Usuario no encontrado');
                return Object.assign(Object.assign({}, user.toObject()), { id: user.id.toString(), role: ((_a = user.roles[0]) === null || _a === void 0 ? void 0 : _a.name) || "client" });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Mutation updateUser:', error.message);
                }
                else {
                    console.error('Error desconocido en Mutation updateUser:', error);
                }
                throw new Error('Error al actualizar el usuario');
            }
        }),
        deleteUser: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user || !context.user.roles.includes('admin')) {
                    throw new Error('No autorizado');
                }
                const result = yield user_service_1.userService.deleteUser(params.id);
                return result !== null;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Mutation deleteUser:', error.message);
                }
                else {
                    console.error('Error desconocido en Mutation deleteUser:', error);
                }
                throw new Error('Error al eliminar el usuario');
            }
        }),
    },
};
