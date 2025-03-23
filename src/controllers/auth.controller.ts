import { Request, Response } from 'express';
import { authService, userService } from '../services';
import { UserInput } from '../interfaces';
import { UserLogin } from '../interfaces';
import { UserDocument } from '../models';
import { AuthError } from '../exceptions';

class AuthController {

    public async register(req: Request, res: Response) {
        try {
            const newUser:UserDocument = await authService.registerUser(req.body as UserInput);
            res.status(201).json(newUser);
            
        } catch (error) {

            if(error instanceof ReferenceError){
                res.status(400).json({message: "User already exists"});
                return;
            }
            res.status(500).json(error);
        }
    }

    public async login(req: Request, res: Response){
        try {
            const resObj =  await authService.login(req.body as UserLogin);
            res.status(200).json(resObj);
        }catch (error){
            //*** Not authorized */
            if (error instanceof AuthError){
                res.status(401).json({message: "Not Authorized"});
                return;
            }
            res.status(500).json(error);
        }
    }
}

export const authController = new AuthController();