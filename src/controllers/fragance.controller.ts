import { Request, Response } from 'express';
import { FraganceDocument } from '../models';
import { fraganceService } from '../services';
import { FraganceInput } from '../interfaces';

class FraganceController {
    public async createFragance(req: Request, res: Response) {
        try {
            const newFragance = await fraganceService.createFragance(req.body as FraganceInput);
            res.status(201).json(newFragance);
        } catch (error) {
            if (error instanceof ReferenceError) {
                res.status(400).json({ message: "Fragance already created: " + error.message });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async getAllFragances(req: Request, res: Response) {
        try {
            const fragances: FraganceDocument[] = await fraganceService.getAllFragances();
            res.json(fragances);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getFragance(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const fragance: FraganceDocument | null = await fraganceService.getFraganceById(id);
            if (fragance === null) {
                res.status(404).json({ message: `Fragance with id ${id} not found` });
                return;
            }
            res.json(fragance);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async updateFragance(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updatedFragance: FraganceDocument | null = await fraganceService.updateFragance(id, req.body as FraganceInput);
            if (updatedFragance === null) {
                res.status(404).json({ message: `Fragance with id ${id} not found` });
                return;
            }
            res.json(updatedFragance);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async deleteFragance(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const deletedFragance: FraganceDocument | null = await fraganceService.deleteFragance(id);
            if (deletedFragance === null) {
                res.status(404).json({ message: `Fragance with id ${id} not found` });
                return;
            }
            res.json(deletedFragance);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const fraganceController = new FraganceController();