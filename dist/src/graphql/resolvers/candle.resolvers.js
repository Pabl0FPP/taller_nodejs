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
exports.candleResolvers = void 0;
const candle_service_1 = require("../../services/candle.service");
exports.candleResolvers = {
    Query: {
        candle: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user)
                    throw new Error('No autenticado');
                const candle = yield candle_service_1.candleService.getCandleById(params.id);
                if (!candle)
                    throw new Error('Error al buscar la vela');
                return Object.assign(Object.assign({}, candle.toObject()), { id: candle.id.toString(), id_container: candle.id_container.toString(), id_fragance: candle.id_fragance.toString() });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Query candle:', error.message);
                }
                else {
                    console.error('Error desconocido en Query candle:', error);
                }
                throw new Error('Error al buscar la vela');
            }
        }),
    },
    Mutation: {
        createCandle: (_root, params, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!context.user)
                    throw new Error('No autenticado');
                return yield candle_service_1.candleService.createCandle(params.input);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en Mutation createCandle:', error.message);
                }
                else {
                    console.error('Error desconocido en Mutation createCandle:', error);
                }
                throw new Error('Error al crear la vela');
            }
        }),
    },
};
