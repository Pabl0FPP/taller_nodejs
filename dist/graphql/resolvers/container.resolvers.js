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
exports.containerResolvers = void 0;
const container_service_1 = require("../../services/container.service");
exports.containerResolvers = {
    Query: {
        containers: (_root, _params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user)
                    throw new Error('No autenticado');
                return yield container_service_1.containerService.getAllContainers();
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Query containers:', error.message);
                }
                else {
                    console.error('Error desconocido en Query containers:', error);
                }
                throw new Error('Error al obtener los contenedores');
            }
        }),
        container: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user)
                    throw new Error('No autenticado');
                const container = yield container_service_1.containerService.getContainerById(params.id);
                if (!container)
                    throw new Error('Contenedor no encontrado');
                return container;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Query container:', error.message);
                }
                else {
                    console.error('Error desconocido en Query container:', error);
                }
                throw new Error('Error al obtener el contenedor');
            }
        }),
    },
    Mutation: {
        createContainer: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user || !context.user.roles.includes('admin')) {
                    throw new Error('No autorizado');
                }
                return yield container_service_1.containerService.createContainer(params.input);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Mutation createContainer:', error.message);
                }
                else {
                    console.error('Error desconocido en Mutation createContainer:', error);
                }
                throw new Error('Error al crear el contenedor');
            }
        }),
        updateContainer: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user || !context.user.roles.includes('admin')) {
                    throw new Error('No autorizado');
                }
                return yield container_service_1.containerService.updateContainer(params.id, params.input);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Mutation updateContainer:', error.message);
                }
                else {
                    console.error('Error desconocido en Mutation updateContainer:', error);
                }
                throw new Error('Error al actualizar el contenedor');
            }
        }),
        deleteContainer: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user || !context.user.roles.includes('admin')) {
                    throw new Error('No autorizado');
                }
                const result = yield container_service_1.containerService.deleteContainer(params.id);
                return result !== null;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Mutation deleteContainer:', error.message);
                }
                else {
                    console.error('Error desconocido en Mutation deleteContainer:', error);
                }
                throw new Error('Error al eliminar el contenedor');
            }
        }),
    },
};
