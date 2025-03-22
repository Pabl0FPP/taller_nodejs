import { Request, Response } from 'express';
import { UserDocument, UserModel } from '../models'
import { userService } from '../services';
import { UserInput } from '../interfaces';

class UserController {
    public async createUser(req: Request, res: Response) {
        try {
            const newUser:UserDocument = await userService.createUser(req.body as UserInput);
            res.status(201).json(newUser);
            
        } catch (error) {

            if(error instanceof ReferenceError){
                res.status(400).json({message: "User already exists"});
                return;
            }
            res.status(500).json(error);
        }
            
        
    }

    public async getUsers(req: Request, res: Response) {
        try {
            const users: UserDocument[] = await userService.getUsers();
            res.status(200).json(users);
            
        } catch (error) {
            res.status(500).json(error);
            
        }
    }

    public async getUser(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const user: UserDocument | null = await userService.findById(id);
            if(user === null){
                res.status(404).json({message: `User with id ${id} not found`})
                return; 
            }
            res.status(200).json(user);
            
        } catch (error) {
            res.status(500).json(error);
            
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const user: UserDocument | null = await userService.updateUser(id, req.body as UserInput);
            if(user === null){
                res.status(404).json({message: `User with id ${id} not found`})
                return;
            }
            res.json(user);

        } catch (error) {
            res.status(500).json(error);
        }  
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const user: UserDocument | null = await userService.deleteUser(id);
            if(user === null){
                res.status(404).json({message: `User with id ${id} not found`})
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }  
    }
}

export const userController = new UserController();