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
exports.candleController = exports.CandleController = void 0;
const candle_service_1 = require("../services/candle.service");
class CandleController {
    createCandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                const candle = yield candle_service_1.candleService.createCandle(req.body, userId);
                res.status(201).json(candle);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    getCandles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                const candles = yield candle_service_1.candleService.getCandles(userId);
                res.status(200).json(candles);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    getCandleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                const candleId = req.params.id;
                const candle = yield candle_service_1.candleService.getCandleById(userId, candleId);
                if (!candle) {
                    res.status(404).json({ message: `Candle with id ${candleId} not found in user's cart` });
                    return;
                }
                res.status(200).json(candle);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    updateCandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                const candleId = req.params.id;
                const candle = yield candle_service_1.candleService.updateCandle(userId, candleId, req.body);
                if (!candle) {
                    res.status(404).json({ message: `Candle with id ${candleId} not found in user's cart` });
                    return;
                }
                res.status(200).json(candle);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
    deleteCandle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                const candleId = req.params.id;
                yield candle_service_1.candleService.deleteCandle(userId, candleId);
                res.status(200).json({ message: "Candle deleted successfully from user's cart" });
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
}
exports.CandleController = CandleController;
exports.candleController = new CandleController();
