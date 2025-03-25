import { FraganceDocument, FraganceModel } from "../models";
import { FraganceInput, FraganceInputUpdate } from "../interfaces";

class FraganceService{
    public async create(fragance: FraganceInput): Promise<FraganceDocument>{
        try{
            const fraganceExists: FraganceDocument | null = await this.findById(fragance.id_fragance);
            if(fraganceExists != null){
                throw new ReferenceError("Fragance already created");
            }
            const newFragance: FraganceDocument = await FraganceModel.create(fragance);
            return newFragance;
        }catch(error){
            throw error;
        }
    }

    public async findAll(): Promise<FraganceDocument[]>{
        try{
            const fragances: FraganceDocument[] = await FraganceModel.find();
            return fragances;
        }catch(error){
            throw error;
        }
    }

    public async findOne(searchParams: any): Promise<FraganceDocument | null>{
        try{
            const fragance: FraganceDocument | null = await FraganceModel.findOne(searchParams);
            return fragance;
        }catch(error){
            throw error;
        }
    }

    public async findById(id: string): Promise<FraganceDocument | null>{
        try{
            const fragance: FraganceDocument | null = await FraganceModel.findById(id);
            return fragance;
        }catch(error){
            throw error;
        }
    }

    public async update(id: string, fragance: FraganceInputUpdate): Promise<FraganceDocument | null>{
        try{
            const updatedFragance: FraganceDocument | null = await FraganceModel.findByIdAndUpdate(id, fragance, { returnOriginal: false });
            return updatedFragance;
        }catch(error){
            throw error;
        }
    }

    public async delete(id: string): Promise<FraganceDocument | null>{
        try{
            const deletedFragance: FraganceDocument | null = await FraganceModel.findByIdAndDelete(id);
            return deletedFragance;
        }catch(error){
            throw error;
        }
    }
}

export const fraganceService = new FraganceService();