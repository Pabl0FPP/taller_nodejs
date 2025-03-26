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
const candle_service_1 = require("../../src/services/candle.service");
const models_1 = require("../../src/models");
const mongoose_1 = require("mongoose");
describe('Candle Service', () => {
    let testContainerId;
    let testFraganceId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const container = yield models_1.ContainerModel.create({
            material: 'Glass',
            height: 10,
            width: 5,
            description: 'Test container'
        });
        testContainerId = container._id;
        const fragance = yield models_1.FraganceModel.create({
            name: 'Lavender',
            description: 'Fresh lavender scent',
            color: 'Purple'
        });
        testFraganceId = fragance._id;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.CandleModel.deleteMany({});
        yield models_1.ContainerModel.deleteMany({});
        yield models_1.FraganceModel.deleteMany({});
    }));
    it('should create a new candle', () => __awaiter(void 0, void 0, void 0, function* () {
        const candle = yield candle_service_1.candleService.createCandle({
            id_container: testContainerId,
            id_fragance: testFraganceId,
            text: 'Test candle'
        });
        expect(candle).toBeDefined();
    }));
    it('should throw error when container not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidContainerId = new mongoose_1.Types.ObjectId().toString();
        yield expect(candle_service_1.candleService.createCandle({
            id_container: invalidContainerId,
            id_fragance: testFraganceId
        })).rejects.toThrow('Container or Fragance not found');
    }));
    it('should throw error when fragance not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidFraganceId = new mongoose_1.Types.ObjectId().toString();
        yield expect(candle_service_1.candleService.createCandle({
            id_container: testContainerId,
            id_fragance: invalidFraganceId
        })).rejects.toThrow('Container or Fragance not found');
    }));
    it('should get candle by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const newCandle = yield models_1.CandleModel.create({
            id_container: testContainerId,
            id_fragance: testFraganceId
        });
        const foundCandle = yield candle_service_1.candleService.getCandleById(newCandle._id);
        expect(foundCandle).toBeDefined();
    }));
    it('should return null when candle not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentId = new mongoose_1.Types.ObjectId().toString();
        const candle = yield candle_service_1.candleService.getCandleById(nonExistentId);
        expect(candle).toBeNull();
    }));
    it('should populate container and fragance when getting candle', () => __awaiter(void 0, void 0, void 0, function* () {
        const newCandle = yield models_1.CandleModel.create({
            id_container: testContainerId,
            id_fragance: testFraganceId
        });
        const foundCandle = yield candle_service_1.candleService.getCandleById(newCandle._id);
        expect(foundCandle === null || foundCandle === void 0 ? void 0 : foundCandle.id_container).toBeDefined();
        expect(foundCandle === null || foundCandle === void 0 ? void 0 : foundCandle.id_fragance).toBeDefined();
    }));
});
