import { fraganceService } from '../../src/services/fragance.service';
import { FraganceInput, FraganceInputUpdate } from '../../src/interfaces';
import { FraganceModel } from '../../src/models';

describe('Fragance Service', () => {
    beforeEach(async () => {
        const fraganceInput: FraganceInput = {
            name: 'Initial Fragance',
            description: 'Initial Description',
            color: 'Red',
            image_url: 'http://example.com/image.jpg'
        };
        await fraganceService.createFragance(fraganceInput);
    });

    afterEach(async () => {
        await FraganceModel.deleteMany({});
    });

    it('should create a new fragance', async () => {
        const fraganceInput: FraganceInput = {
            name: 'Test Fragance',
            description: 'Test Description',
            color: 'Blue',
            image_url: 'http://example.com/test-image.jpg'
        };

        const fragance = await fraganceService.createFragance(fraganceInput);
        expect(fragance).toBeDefined();
        expect(fragance.name).toBe(fraganceInput.name);
    });

    it('should get a fragance by id', async () => {
        const fragance = await fraganceService.findFraganceByAttributes({ color: 'Red' });
        const id = fragance?._id as string;
        const foundFragance = await fraganceService.getFraganceById(id);
        expect(foundFragance).toBeDefined();
        expect(foundFragance?.name).toBe('Initial Fragance');
    });

    it('should find a fragance by attributes', async () => {
        const fragance = await fraganceService.findFraganceByAttributes({ name: 'Initial Fragance', description: 'Initial Description', color: 'Red' });
        expect(fragance).toBeDefined();
        expect(fragance?.name).toBe('Initial Fragance');
    });

    it('should get all fragances', async () => {
        const fragances = await fraganceService.getAllFragances();
        expect(fragances).toBeDefined();
        expect(fragances.length).toBeGreaterThan(0);
    });

    it('should update a fragance', async () => {
        const fraganceInputUpdate: FraganceInputUpdate = {
            name: 'Updated Fragance',
            description: 'Updated Description',
            color: 'Green',
            image_url: 'http://example.com/updated-image.jpg'
        };
        const fragance = await fraganceService.findFraganceByAttributes({ color: 'Red' });
        const fraganceId = fragance?._id as string;
        const updatedFragance = await fraganceService.updateFragance(fraganceId, fraganceInputUpdate);
        expect(updatedFragance).toBeDefined();
        expect(updatedFragance?.name).toBe(fraganceInputUpdate.name);
    });

    it('should delete a fragance', async () => {
        const fragance = await fraganceService.findFraganceByAttributes({ color: 'Red' });
        const fraganceId = fragance?._id as string;
        await fraganceService.deleteFragance(fraganceId);
        const deletedFragance = await fraganceService.getFraganceById(fraganceId);
        expect(deletedFragance).toBeNull();
    });

    it('should throw an error when creating a fragance with the same attributes', async () => {
        const fraganceInput: FraganceInput = {
            name: 'Initial Fragance',
            description: 'Initial Description',
            color: 'Red',
            image_url: 'http://example.com/image.jpg'
        };

        await expect(fraganceService.createFragance(fraganceInput)).rejects.toThrow(ReferenceError);
    });

    it('should return null when getting a fragance by non-existing id', async () => {
        const id = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id
        const fragance = await fraganceService.getFraganceById(id);
        expect(fragance).toBeNull();
    });

    it('should throw an error when updating a fragance with a non-existing id', async () => {
        const fraganceInputUpdate: FraganceInputUpdate = {
            name: 'Non-existing Fragance',
            description: 'Non-existing Description',
            color: 'Purple',
            image_url: 'http://example.com/non-existing-image.jpg'
        };
        const fraganceId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id

        await expect(fraganceService.updateFragance(fraganceId, fraganceInputUpdate)).rejects.toThrow();
    });

    it('should throw an error when deleting a fragance with a non-existing id', async () => {
        const fraganceId = '605c72ef1c4a4e3a2c8f9b9b'; // Some non-existing id

        await expect(fraganceService.deleteFragance(fraganceId)).rejects.toThrow();
    });
});