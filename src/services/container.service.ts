import { ContainerDocument, ContainerModel } from "../models";
import { ContainerInput, ContainerInputUpdate } from "../interfaces";

class ContainerService {
    public async createContainer(container: ContainerInput): Promise<ContainerDocument> {
        try {
            const containerExists: ContainerDocument | null = await this.findContainerByAttributes({
                material: container.material,
                height: container.height,
                width: container.width
            });
            if (containerExists != null) {
                throw new ReferenceError("Container already created with the same attributes");
            }
            const newContainer: ContainerDocument = await ContainerModel.create(container);
            return newContainer;
        } catch (error) {
            throw error;
        }
    }

    public async getAllContainers(): Promise<ContainerDocument[]> {
        try {
            const containers: ContainerDocument[] = await ContainerModel.find();
            return containers;
        } catch (error) {
            throw error;
        }
    }

    public async findContainerByAttributes(searchParams: any): Promise<ContainerDocument | null> {
        try {
            const container: ContainerDocument | null = await ContainerModel.findOne(searchParams);
            return container;
        } catch (error) {
            throw error;
        }
    }

    public async getContainerById(id: string): Promise<ContainerDocument | null> {
        try {
            const container: ContainerDocument | null = await ContainerModel.findById(id);
            return container;
        } catch (error) {
            throw error;
        }
    }

    public async updateContainer(id: string, container: ContainerInputUpdate): Promise<ContainerDocument | null> {
        try {
            const updatedContainer: ContainerDocument | null = await ContainerModel.findByIdAndUpdate(id, container, { returnOriginal: false });
            if (!updatedContainer) {
                throw new Error('Container not found');
            }
            return updatedContainer;
        } catch (error) {
            throw error;
        }
    }

    public async deleteContainer(id: string): Promise<ContainerDocument | null> {
        try {
            const deletedContainer: ContainerDocument | null = await ContainerModel.findByIdAndDelete(id);
            if (!deletedContainer) {
                throw new Error('Container not found');
            }
            return deletedContainer;
        } catch (error) {
            throw error;
        }
    }
}

export const containerService = new ContainerService();