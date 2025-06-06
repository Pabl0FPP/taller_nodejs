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
exports.fraganceService = void 0;
const models_1 = require("../models");
class FraganceService {
    createFragance(fragance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fraganceExists = yield this.findFraganceByAttributes({
                    name: fragance.name,
                    description: fragance.description,
                    color: fragance.color,
                    image_url: fragance.image_url
                });
                if (fraganceExists != null) {
                    throw new ReferenceError("Fragance already created with the same attributes");
                }
                const newFragance = yield models_1.FraganceModel.create(fragance);
                return newFragance;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllFragances() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragances = yield models_1.FraganceModel.find();
                return fragances;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findFraganceByAttributes(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragance = yield models_1.FraganceModel.findOne(searchParams);
                return fragance;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getFraganceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragance = yield models_1.FraganceModel.findById(id);
                return fragance;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateFragance(id, fragance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedFragance = yield models_1.FraganceModel.findByIdAndUpdate(id, fragance, { returnOriginal: false });
                if (!updatedFragance) {
                    throw new Error('Fragance not found');
                }
                return updatedFragance;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteFragance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedFragance = yield models_1.FraganceModel.findByIdAndDelete(id);
                if (!deletedFragance) {
                    throw new Error('Fragance not found');
                }
                return deletedFragance;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.fraganceService = new FraganceService();
