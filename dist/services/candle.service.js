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
exports.candleService = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
class CandleService {
    createCandle(candleInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar que el contenedor y la fragancia existen
                const containerExists = yield models_2.ContainerModel.findById(candleInput.id_container);
                const fraganceExists = yield models_2.FraganceModel.findById(candleInput.id_fragance);
                if (!containerExists || !fraganceExists) {
                    throw new Error("Container or Fragance not found");
                }
                const newCandle = yield models_1.CandleModel.create(candleInput);
                return newCandle;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCandleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.CandleModel.findById(id)
                    .populate('id_container')
                    .populate('id_fragance');
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.candleService = new CandleService();
