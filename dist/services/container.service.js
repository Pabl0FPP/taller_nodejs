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
exports.containerService = void 0;
const models_1 = require("../models");
class ContainerService {
    createContainer(container) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const containerExists = yield this.findContainerByAttributes({
                    material: container.material,
                    height: container.height,
                    width: container.width
                });
                if (containerExists != null) {
                    throw new ReferenceError("Container already created with the same attributes");
                }
                const newContainer = yield models_1.ContainerModel.create(container);
                return newContainer;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllContainers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const containers = yield models_1.ContainerModel.find();
                return containers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findContainerByAttributes(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = yield models_1.ContainerModel.findOne(searchParams);
                return container;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getContainerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = yield models_1.ContainerModel.findById(id);
                return container;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateContainer(id, container) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContainer = yield models_1.ContainerModel.findByIdAndUpdate(id, container, { returnOriginal: false });
                if (!updatedContainer) {
                    throw new Error('Container not found');
                }
                return updatedContainer;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteContainer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedContainer = yield models_1.ContainerModel.findByIdAndDelete(id);
                if (!deletedContainer) {
                    throw new Error('Container not found');
                }
                return deletedContainer;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.containerService = new ContainerService();
