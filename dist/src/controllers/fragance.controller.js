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
exports.fraganceController = void 0;
const services_1 = require("../services");
class FraganceController {
    createFragance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newFragance = yield services_1.fraganceService.createFragance(req.body);
                res.status(201).json(newFragance);
            }
            catch (error) {
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Fragance already created: " + error.message });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    getAllFragances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragances = yield services_1.fraganceService.getAllFragances();
                res.json(fragances);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getFragance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const fragance = yield services_1.fraganceService.getFraganceById(id);
                if (fragance === null) {
                    res.status(404).json({ message: `Fragance with id ${id} not found` });
                    return;
                }
                res.json(fragance);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    updateFragance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updatedFragance = yield services_1.fraganceService.updateFragance(id, req.body);
                if (updatedFragance === null) {
                    res.status(404).json({ message: `Fragance with id ${id} not found` });
                    return;
                }
                res.json(updatedFragance);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    deleteFragance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const deletedFragance = yield services_1.fraganceService.deleteFragance(id);
                if (deletedFragance === null) {
                    res.status(404).json({ message: `Fragance with id ${id} not found` });
                    return;
                }
                res.json(deletedFragance);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.fraganceController = new FraganceController();
