import { containerService } from '../../src/services/container.service';
import { ContainerInput, ContainerInputUpdate } from '../../src/interfaces';
import { ContainerModel } from '../../src/models';

describe('Container Service', () => {
    beforeEach(async () => {
        const containerInput: ContainerInput = {
            material: 'Plastic',
            height: 10,
            width: 5,
            description: 'Initial Description'
        };
        await containerService.createContainer(containerInput);
    });

    afterEach(async () => {
        await ContainerModel.deleteMany({});
    });

    it('should create a new container', async () => {
        const containerInput: ContainerInput = {
            material: 'Metal',
            height: 15,
            width: 10,
            description: 'Test Description'
        };

        const container = await containerService.createContainer(containerInput);
        expect(container).toBeDefined();
        expect(container.material).toBe(containerInput.material);
    });

    it('should get a container by id', async () => {
        const container = await containerService.findContainerByAttributes({ material: 'Plastic' });
        const id = container?._id as string;
        const foundContainer = await containerService.getContainerById(id);
        expect(foundContainer).toBeDefined();
        expect(foundContainer?.material).toBe('Plastic');
    });

    it('should find a container by attributes', async () => {
        const container = await containerService.findContainerByAttributes({ material: 'Plastic', height: 10, width: 5 });
        expect(container).toBeDefined();
        expect(container?.material).toBe('Plastic');
    });

    it('should get all containers', async () => {
        const containers = await containerService.getAllContainers();
        expect(containers).toBeDefined();
        expect(containers.length).toBeGreaterThan(0);
    });

    it('should update a container', async () => {
        const containerInputUpdate: ContainerInputUpdate = {
            material: 'Updated Material',
            height: 20,
            width: 10,
            description: 'Updated Description'
        };
        const container = await containerService.findContainerByAttributes({ material: 'Plastic' });
        const containerId = container?._id as string;
        const updatedContainer = await containerService.updateContainer(containerId, containerInputUpdate);
        expect(updatedContainer).toBeDefined();
        expect(updatedContainer?.material).toBe(containerInputUpdate.material);
    });

    it('should delete a container', async () => {
        const container = await containerService.findContainerByAttributes({ material: 'Plastic' });
        const containerId = container?._id as string;
        await containerService.deleteContainer(containerId);
        const deletedContainer = await containerService.getContainerById(containerId);
        expect(deletedContainer).toBeNull();
    });

    it('should throw an error when creating a container with the same attributes', async () => {
        const containerInput: ContainerInput = {
            material: 'Plastic',
            height: 10,
            width: 5,
            description: 'Initial Description'
        };

        await expect(containerService.createContainer(containerInput)).rejects.toThrow(ReferenceError);
    });

    it('should return null when getting a container by non-existing id', async () => {
        const id = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        const container = await containerService.getContainerById(id);
        expect(container).toBeNull();
    });

    it('should throw an error when updating a container with a non-existing id', async () => {
        const containerInputUpdate: ContainerInputUpdate = {
            material: 'Non-existing Material',
            height: 30,
            width: 20,
            description: 'Non-existing Description'
        };
        const containerId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id

        await expect(containerService.updateContainer(containerId, containerInputUpdate)).rejects.toThrow();
    });

    it('should throw an error when deleting a container with a non-existing id', async () => {
        const containerId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id

        await expect(containerService.deleteContainer(containerId)).rejects.toThrow();
    });
});