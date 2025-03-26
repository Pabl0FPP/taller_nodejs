import { Request, Response } from 'express';
import { ContainerDocument } from '../models';
import { containerService } from '../services';
import { ContainerInput } from '../interfaces';

class ContainerController {
    public async createContainer(req: Request, res: Response) {
        try {
            const newContainer = await containerService.createContainer(req.body as ContainerInput);
            res.status(201).json(newContainer);
        } catch (error) {
            if (error instanceof ReferenceError) {
                res.status(400).json({ message: "Container already created: " + error.message });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async getAllContainers(req: Request, res: Response) {
        try {
            const containers: ContainerDocument[] = await containerService.getAllContainers();
            res.json(containers);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getContainer(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const container: ContainerDocument | null = await containerService.getContainerById(id);
            if (container === null) {
                res.status(404).json({ message: `Container with id ${id} not found` });
                return;
            }
            res.json(container);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async updateContainer(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updatedContainer: ContainerDocument | null = await containerService.updateContainer(id, req.body as ContainerInput);
            if (updatedContainer === null) {
                res.status(404).json({ message: `Container with id ${id} not found` });
                return;
            }
            res.json(updatedContainer);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async deleteContainer(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const deletedContainer: ContainerDocument | null = await containerService.deleteContainer(id);
            if (deletedContainer === null) {
                res.status(404).json({ message: `Container with id ${id} not found` });
                return;
            }
            res.json(deletedContainer);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const containerController = new ContainerController();