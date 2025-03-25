import { ContainerDocument, ContainerModel } from "../models";
import { ContainerInput, ContainerInputUpdate } from "../interfaces";

class ContainerService {
    public async create(container: ContainerInput): Promise<ContainerDocument> {
        try{
            const containerExists: ContainerDocument | null = await this.findById(container.id_container);
            if(containerExists != null){
                throw new ReferenceError("Container already created");
            }
            const newContainer: ContainerDocument = await ContainerModel.create(container);
            return newContainer;
        }catch(error){
            throw error;
        }
        
    }

    public async findAll(): Promise<ContainerDocument[]> {
        try{
            const containers: ContainerDocument[] = await ContainerModel.find();
            return containers;
        }catch(error){
            throw error;
        }
    }

    public async findOne(searchParams: any): Promise<ContainerDocument | null> {
        try{
            const container: ContainerDocument | null = await ContainerModel.findOne(searchParams);
            return container;
        }catch(error){
            throw error;
        }
    }

    public async findById(id: string): Promise<ContainerDocument | null> {
        try{
            const container: ContainerDocument | null = await ContainerModel.findById(id);
            return container;
        }catch(error){
            throw error;
        }
    }

    public async update(id: string, container: ContainerInputUpdate): Promise<ContainerDocument | null> {
        try{
            const updatedContainer: ContainerDocument | null = await ContainerModel.findByIdAndUpdate(id, container, { returnOriginal: false });
            return updatedContainer;
        }catch(error){
            throw error;
        }
    }

    public async delete(id: string): Promise<ContainerDocument | null> {
        try{
            const deletedContainer: ContainerDocument | null = await ContainerModel.findByIdAndDelete(id);
            return deletedContainer;
        }catch(error){
            throw error;
        }
    }

}

export const containerService = new ContainerService();