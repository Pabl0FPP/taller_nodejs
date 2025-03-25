import { Request, Response } from 'express';
import { FraganceDocument } from '../models';
import { fraganceService } from '../services';
import { FraganceInput } from '../interfaces';

class FraganceController{
    public async create(req: Request, res: Response){
        try{
            const newFragance = await fraganceService.create(req.body as FraganceInput);
            res.status(201).json(newFragance);
        }catch(error){
            if(error instanceof ReferenceError){
                res.status(400).json({message: "Fragance already created" + error.message});
                return;
            }
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response){
        try{
            const fragances: FraganceDocument[] = await fraganceService.findAll();
            res.json(fragances);
        }catch(error){
            res.status(500).json(error);
        }
    }

    public async get(req: Request, res: Response){
        try{
            const searchParams = req.query;
            const fragance: FraganceDocument | null = await fraganceService.findOne(searchParams);
            if(fragance === null){
                res.status(404).json({message: `Fragance with param(s) ${searchParams} not found`});
                return;
            }
            res.json(fragance);
        }catch(error){
            res.status(500).json(error);
        }
    }

    public async getById(req: Request, res: Response){
        try{
            const id = req.params.id;
            const fragance: FraganceDocument | null = await fraganceService.findById(id);
            if(fragance === null){
                res.status(404).json({message: `Fragance with id ${id} not found`});
                return;
            }
            res.json(fragance);
        }catch(error){
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response){
        try{
            const id = req.params.id;
            const updatedFragance: FraganceDocument | null = await fraganceService.update(id, req.body as FraganceInput);
            if(updatedFragance === null){
                res.status(404).json({message: `Fragance with id ${id} not found`});
                return;
            }
            res.json(updatedFragance);
        }catch(error){
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response){
        try{
            const id = req.params.id;
            const deletedFragance: FraganceDocument | null = await fraganceService.delete(id);
            if(deletedFragance === null){
                res.status(404).json({message: `Fragance with id ${id} not found`});
                return;
            }
            res.json(deletedFragance);
        }catch(error){
            res.status(500).json(error);
        }
    }
}

export const fraganceController = new FraganceController();