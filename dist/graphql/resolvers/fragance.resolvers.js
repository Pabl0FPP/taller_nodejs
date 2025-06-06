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
exports.fraganceResolvers = void 0;
const fragance_service_1 = require("../../services/fragance.service");
exports.fraganceResolvers = {
    Query: {
        fragances: (_root, _params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user)
                    throw new Error('No autenticado');
                return yield fragance_service_1.fraganceService.getAllFragances();
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Query fragances:', error.message);
                }
                else {
                    console.error('Error desconocido en Query fragances:', error);
                }
                throw new Error('Error al obtener las fragancias');
            }
        }),
        fragance: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user)
                    throw new Error('No autenticado');
                const fragance = yield fragance_service_1.fraganceService.getFraganceById(params.id);
                if (!fragance)
                    throw new Error('Fragancia no encontrada');
                return fragance;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Query fragance:', error.message);
                }
                else {
                    console.error('Error desconocido en Query fragance:', error);
                }
                throw new Error('Error al obtener la fragancia');
            }
        }),
    },
    Mutation: {
        createFragance: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user || !context.user.roles.includes('admin')) {
                    throw new Error('No autorizado');
                }
                return yield fragance_service_1.fraganceService.createFragance(params.input);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Mutation createFragance:', error.message);
                }
                else {
                    console.error('Error desconocido en Mutation createFragance:', error);
                }
                throw new Error('Error al crear la fragancia');
            }
        }),
        updateFragance: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user || !context.user.roles.includes('admin')) {
                    throw new Error('No autorizado');
                }
                return yield fragance_service_1.fraganceService.updateFragance(params.id, params.input);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Mutation updateFragance:', error.message);
                }
                else {
                    console.error('Error desconocido en Mutation updateFragance:', error);
                }
                throw new Error('Error al actualizar la fragancia');
            }
        }),
        deleteFragance: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user || !context.user.roles.includes('admin')) {
                    throw new Error('No autorizado');
                }
                const result = yield fragance_service_1.fraganceService.deleteFragance(params.id);
                return result !== null;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Mutation deleteFragance:', error.message);
                }
                else {
                    console.error('Error desconocido en Mutation deleteFragance:', error);
                }
                throw new Error('Error al eliminar la fragancia');
            }
        }),
    },
};
