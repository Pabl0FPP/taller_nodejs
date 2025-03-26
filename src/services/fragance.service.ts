import { FraganceDocument, FraganceModel } from "../models";
import { FraganceInput, FraganceInputUpdate } from "../interfaces";

class FraganceService {
    public async createFragance(fragance: FraganceInput): Promise<FraganceDocument> {
        try {
            const fraganceExists: FraganceDocument | null = await this.findFraganceByAttributes({
                name: fragance.name,
                description: fragance.description,
                color: fragance.color,
                image_url: fragance.image_url
            });
            if (fraganceExists != null) {
                throw new ReferenceError("Fragance already created with the same attributes");
            }
            const newFragance: FraganceDocument = await FraganceModel.create(fragance);
            return newFragance;
        } catch (error) {
            throw error;
        }
    }

    public async getAllFragances(): Promise<FraganceDocument[]> {
        try {
            const fragances: FraganceDocument[] = await FraganceModel.find();
            return fragances;
        } catch (error) {
            throw error;
        }
    }

    public async findFraganceByAttributes(searchParams: any): Promise<FraganceDocument | null> {
        try {
            const fragance: FraganceDocument | null = await FraganceModel.findOne(searchParams);
            return fragance;
        } catch (error) {
            throw error;
        }
    }

    public async getFraganceById(id: string): Promise<FraganceDocument | null> {
        try {
            const fragance: FraganceDocument | null = await FraganceModel.findById(id);
            return fragance;
        } catch (error) {
            throw error;
        }
    }

    public async updateFragance(id: string, fragance: FraganceInputUpdate): Promise<FraganceDocument | null> {
        try {
            const updatedFragance: FraganceDocument | null = await FraganceModel.findByIdAndUpdate(id, fragance, { returnOriginal: false });
            if (!updatedFragance) {
                throw new Error('Fragance not found');
            }
            return updatedFragance;
        } catch (error) {
            throw error;
        }
    }

    public async deleteFragance(id: string): Promise<FraganceDocument | null> {
        try {
            const deletedFragance: FraganceDocument | null = await FraganceModel.findByIdAndDelete(id);
            if (!deletedFragance) {
                throw new Error('Fragance not found');
            }
            return deletedFragance;
        } catch (error) {
            throw error;
        }
    }
}

export const fraganceService = new FraganceService();