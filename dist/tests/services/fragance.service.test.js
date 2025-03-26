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
const fragance_service_1 = require("../../src/services/fragance.service");
const models_1 = require("../../src/models");
describe('Fragance Service', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const fraganceInput = {
            name: 'Initial Fragance',
            description: 'Initial Description',
            color: 'Red',
            image_url: 'http://example.com/image.jpg'
        };
        yield fragance_service_1.fraganceService.createFragance(fraganceInput);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.FraganceModel.deleteMany({});
    }));
    it('should create a new fragance', () => __awaiter(void 0, void 0, void 0, function* () {
        const fraganceInput = {
            name: 'Test Fragance',
            description: 'Test Description',
            color: 'Blue',
            image_url: 'http://example.com/test-image.jpg'
        };
        const fragance = yield fragance_service_1.fraganceService.createFragance(fraganceInput);
        expect(fragance).toBeDefined();
        expect(fragance.name).toBe(fraganceInput.name);
    }));
    it('should get a fragance by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const fragance = yield fragance_service_1.fraganceService.findFraganceByAttributes({ color: 'Red' });
        const id = fragance === null || fragance === void 0 ? void 0 : fragance._id;
        const foundFragance = yield fragance_service_1.fraganceService.getFraganceById(id);
        expect(foundFragance).toBeDefined();
        expect(foundFragance === null || foundFragance === void 0 ? void 0 : foundFragance.name).toBe('Initial Fragance');
    }));
    it('should find a fragance by attributes', () => __awaiter(void 0, void 0, void 0, function* () {
        const fragance = yield fragance_service_1.fraganceService.findFraganceByAttributes({ name: 'Initial Fragance', description: 'Initial Description', color: 'Red' });
        expect(fragance).toBeDefined();
        expect(fragance === null || fragance === void 0 ? void 0 : fragance.name).toBe('Initial Fragance');
    }));
    it('should get all fragances', () => __awaiter(void 0, void 0, void 0, function* () {
        const fragances = yield fragance_service_1.fraganceService.getAllFragances();
        expect(fragances).toBeDefined();
        expect(fragances.length).toBeGreaterThan(0);
    }));
    it('should update a fragance', () => __awaiter(void 0, void 0, void 0, function* () {
        const fraganceInputUpdate = {
            name: 'Updated Fragance',
            description: 'Updated Description',
            color: 'Green',
            image_url: 'http://example.com/updated-image.jpg'
        };
        const fragance = yield fragance_service_1.fraganceService.findFraganceByAttributes({ color: 'Red' });
        const fraganceId = fragance === null || fragance === void 0 ? void 0 : fragance._id;
        const updatedFragance = yield fragance_service_1.fraganceService.updateFragance(fraganceId, fraganceInputUpdate);
        expect(updatedFragance).toBeDefined();
        expect(updatedFragance === null || updatedFragance === void 0 ? void 0 : updatedFragance.name).toBe(fraganceInputUpdate.name);
    }));
    it('should delete a fragance', () => __awaiter(void 0, void 0, void 0, function* () {
        const fragance = yield fragance_service_1.fraganceService.findFraganceByAttributes({ color: 'Red' });
        const fraganceId = fragance === null || fragance === void 0 ? void 0 : fragance._id;
        yield fragance_service_1.fraganceService.deleteFragance(fraganceId);
        const deletedFragance = yield fragance_service_1.fraganceService.getFraganceById(fraganceId);
        expect(deletedFragance).toBeNull();
    }));
    it('should throw an error when creating a fragance with the same attributes', () => __awaiter(void 0, void 0, void 0, function* () {
        const fraganceInput = {
            name: 'Initial Fragance',
            description: 'Initial Description',
            color: 'Red',
            image_url: 'http://example.com/image.jpg'
        };
        yield expect(fragance_service_1.fraganceService.createFragance(fraganceInput)).rejects.toThrow(ReferenceError);
    }));
    it('should return null when getting a fragance by non-existing id', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        const fragance = yield fragance_service_1.fraganceService.getFraganceById(id);
        expect(fragance).toBeNull();
    }));
    it('should throw an error when updating a fragance with a non-existing id', () => __awaiter(void 0, void 0, void 0, function* () {
        const fraganceInputUpdate = {
            name: 'Non-existing Fragance',
            description: 'Non-existing Description',
            color: 'Purple',
            image_url: 'http://example.com/non-existing-image.jpg'
        };
        const fraganceId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        yield expect(fragance_service_1.fraganceService.updateFragance(fraganceId, fraganceInputUpdate)).rejects.toThrow();
    }));
    it('should throw an error when deleting a fragance with a non-existing id', () => __awaiter(void 0, void 0, void 0, function* () {
        const fraganceId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        yield expect(fragance_service_1.fraganceService.deleteFragance(fraganceId)).rejects.toThrow();
    }));
});
