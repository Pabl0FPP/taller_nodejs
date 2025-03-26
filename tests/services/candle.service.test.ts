import { candleService } from '../../src/services/candle.service';
import { CandleModel, ContainerModel, FraganceModel } from '../../src/models';
import { Types } from 'mongoose';

describe('Candle Service', () => {
    let testContainerId: string;
    let testFraganceId: string;

    beforeEach(async () => {
        const container = await ContainerModel.create({
            material: 'Glass',
            height: 10,
            width: 5,
            description: 'Test container'
        });
        testContainerId = container._id as string;

        const fragance = await FraganceModel.create({
            name: 'Lavender',
            description: 'Fresh lavender scent',
            color: 'Purple'
        });
        testFraganceId = fragance._id as string;
    });

    afterEach(async () => {
        await CandleModel.deleteMany({});
        await ContainerModel.deleteMany({});
        await FraganceModel.deleteMany({});
    });

    it('should create a new candle', async () => {
        const candle = await candleService.createCandle({
            id_container: testContainerId,
            id_fragance: testFraganceId,
            text: 'Test candle'
        });

        expect(candle).toBeDefined();
    });

    it('should throw error when container not found', async () => {
        const invalidContainerId = new Types.ObjectId().toString();
        await expect(
            candleService.createCandle({
                id_container: invalidContainerId,
                id_fragance: testFraganceId
            })
        ).rejects.toThrow('Container or Fragance not found');
    });

    it('should throw error when fragance not found', async () => {
        const invalidFraganceId = new Types.ObjectId().toString();
        await expect(
            candleService.createCandle({
                id_container: testContainerId,
                id_fragance: invalidFraganceId
            })
        ).rejects.toThrow('Container or Fragance not found');
    });

    it('should get candle by id', async () => {
        const newCandle = await CandleModel.create({
            id_container: testContainerId,
            id_fragance: testFraganceId
        });

        const foundCandle = await candleService.getCandleById(newCandle._id as string);
        expect(foundCandle).toBeDefined();
    });

    it('should return null when candle not found', async () => {
        const nonExistentId = new Types.ObjectId().toString();
        const candle = await candleService.getCandleById(nonExistentId);
        expect(candle).toBeNull();
    });

    it('should populate container and fragance when getting candle', async () => {
        const newCandle = await CandleModel.create({
            id_container: testContainerId,
            id_fragance: testFraganceId
        });

        const foundCandle = await candleService.getCandleById(newCandle._id as string);
        expect(foundCandle?.id_container).toBeDefined();
        expect(foundCandle?.id_fragance).toBeDefined();
    });
});