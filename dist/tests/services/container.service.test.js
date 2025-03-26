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
const container_service_1 = require("../../src/services/container.service");
const models_1 = require("../../src/models");
describe('Container Service', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const containerInput = {
            material: 'Plastic',
            height: 10,
            width: 5,
            description: 'Initial Description'
        };
        yield container_service_1.containerService.createContainer(containerInput);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.ContainerModel.deleteMany({});
    }));
    it('should create a new container', () => __awaiter(void 0, void 0, void 0, function* () {
        const containerInput = {
            material: 'Metal',
            height: 15,
            width: 10,
            description: 'Test Description'
        };
        const container = yield container_service_1.containerService.createContainer(containerInput);
        expect(container).toBeDefined();
        expect(container.material).toBe(containerInput.material);
    }));
    it('should get a container by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const container = yield container_service_1.containerService.findContainerByAttributes({ material: 'Plastic' });
        const id = container === null || container === void 0 ? void 0 : container._id;
        const foundContainer = yield container_service_1.containerService.getContainerById(id);
        expect(foundContainer).toBeDefined();
        expect(foundContainer === null || foundContainer === void 0 ? void 0 : foundContainer.material).toBe('Plastic');
    }));
    it('should find a container by attributes', () => __awaiter(void 0, void 0, void 0, function* () {
        const container = yield container_service_1.containerService.findContainerByAttributes({ material: 'Plastic', height: 10, width: 5 });
        expect(container).toBeDefined();
        expect(container === null || container === void 0 ? void 0 : container.material).toBe('Plastic');
    }));
    it('should get all containers', () => __awaiter(void 0, void 0, void 0, function* () {
        const containers = yield container_service_1.containerService.getAllContainers();
        expect(containers).toBeDefined();
        expect(containers.length).toBeGreaterThan(0);
    }));
    it('should update a container', () => __awaiter(void 0, void 0, void 0, function* () {
        const containerInputUpdate = {
            material: 'Updated Material',
            height: 20,
            width: 10,
            description: 'Updated Description'
        };
        const container = yield container_service_1.containerService.findContainerByAttributes({ material: 'Plastic' });
        const containerId = container === null || container === void 0 ? void 0 : container._id;
        const updatedContainer = yield container_service_1.containerService.updateContainer(containerId, containerInputUpdate);
        expect(updatedContainer).toBeDefined();
        expect(updatedContainer === null || updatedContainer === void 0 ? void 0 : updatedContainer.material).toBe(containerInputUpdate.material);
    }));
    it('should delete a container', () => __awaiter(void 0, void 0, void 0, function* () {
        const container = yield container_service_1.containerService.findContainerByAttributes({ material: 'Plastic' });
        const containerId = container === null || container === void 0 ? void 0 : container._id;
        yield container_service_1.containerService.deleteContainer(containerId);
        const deletedContainer = yield container_service_1.containerService.getContainerById(containerId);
        expect(deletedContainer).toBeNull();
    }));
    it('should throw an error when creating a container with the same attributes', () => __awaiter(void 0, void 0, void 0, function* () {
        const containerInput = {
            material: 'Plastic',
            height: 10,
            width: 5,
            description: 'Initial Description'
        };
        yield expect(container_service_1.containerService.createContainer(containerInput)).rejects.toThrow(ReferenceError);
    }));
    it('should return null when getting a container by non-existing id', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        const container = yield container_service_1.containerService.getContainerById(id);
        expect(container).toBeNull();
    }));
    it('should throw an error when updating a container with a non-existing id', () => __awaiter(void 0, void 0, void 0, function* () {
        const containerInputUpdate = {
            material: 'Non-existing Material',
            height: 30,
            width: 20,
            description: 'Non-existing Description'
        };
        const containerId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        yield expect(container_service_1.containerService.updateContainer(containerId, containerInputUpdate)).rejects.toThrow();
    }));
    it('should throw an error when deleting a container with a non-existing id', () => __awaiter(void 0, void 0, void 0, function* () {
        const containerId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        yield expect(container_service_1.containerService.deleteContainer(containerId)).rejects.toThrow();
    }));
});
