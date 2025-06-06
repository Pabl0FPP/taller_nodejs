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
exports.containerController = void 0;
const services_1 = require("../services");
class ContainerController {
    createContainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContainer = yield services_1.containerService.createContainer(req.body);
                res.status(201).json(newContainer);
            }
            catch (error) {
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Container already created: " + error.message });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    getAllContainers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const containers = yield services_1.containerService.getAllContainers();
                res.json(containers);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getContainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const container = yield services_1.containerService.getContainerById(id);
                if (container === null) {
                    res.status(404).json({ message: `Container with id ${id} not found` });
                    return;
                }
                res.json(container);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    updateContainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updatedContainer = yield services_1.containerService.updateContainer(id, req.body);
                if (updatedContainer === null) {
                    res.status(404).json({ message: `Container with id ${id} not found` });
                    return;
                }
                res.json(updatedContainer);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    deleteContainer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const deletedContainer = yield services_1.containerService.deleteContainer(id);
                if (deletedContainer === null) {
                    res.status(404).json({ message: `Container with id ${id} not found` });
                    return;
                }
                res.json(deletedContainer);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.containerController = new ContainerController();
