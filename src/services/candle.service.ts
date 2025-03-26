import { CandleDocument, CandleModel } from "../models";
import { CandleInput } from "../interfaces";
import { ContainerModel, FraganceModel } from "../models";

class CandleService {
    public async createCandle(candleInput: CandleInput): Promise<CandleDocument> {
        try {
            // Verificar que el contenedor y la fragancia existen
            const containerExists = await ContainerModel.findById(candleInput.id_container);
            const fraganceExists = await FraganceModel.findById(candleInput.id_fragance);
            
            if (!containerExists || !fraganceExists) {
                throw new Error("Container or Fragance not found");
            }

            const newCandle = await CandleModel.create(candleInput);
            return newCandle;
        } catch (error) {
            throw error;
        }
    }

    public async getCandleById(id: string): Promise<CandleDocument | null> {
        try {
            return await CandleModel.findById(id)
                .populate('id_container')
                .populate('id_fragance');
        } catch (error) {
            throw error;
        }
    }
}

export const candleService = new CandleService();