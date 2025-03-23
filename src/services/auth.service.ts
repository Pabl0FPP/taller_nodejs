import { UserLogin, UserLoginResponse } from "../interfaces";
import { userService } from "./user.service";
import bcrypt from "bcrypt";
import { AuthError } from "../exceptions";
import { UserDocument } from "../models";
import jwt from "jsonwebtoken";
import { UserInput } from "../interfaces";
import { UserModel } from "../models";
import { RoleModel } from "../models";

class AuthService{

    public async registerUser(userInput: UserInput): Promise<UserDocument>{
            try {
                const userExists: UserDocument | null = await userService.findByEmail(userInput.email);
                if (userExists != null){
                    throw new ReferenceError("User already exists");
                }
                if (userInput.password) 
                    userInput.password = await bcrypt.hash(userInput.password, 10);
    
                const role = await RoleModel.findOne({name: "client"});
                const user: UserDocument = await UserModel.create({...userInput, roles:[role?._id]}); 
                await user.populate('roles');

                return user;
            } catch (error) {
                throw error;
            }
        }

    public async login(userLogin: UserLogin): Promise<UserLoginResponse | undefined>{
        try {
            const userExists: UserDocument | null = await UserModel.findOne({email: userLogin.email}).populate('roles');
            if (userExists === null){
                throw new AuthError("Not Authorized");
            }
            const isMatch: boolean = await bcrypt.compare(userLogin.password, userExists.password);  
            if (!isMatch){
                throw new AuthError("Not Authorized");
            }
            return {
                user:{
                    id: userExists.id,
                    name: userExists.name,
                    email: userExists.email,
                    roles: userExists.roles.map(role => role.name),
                    token: this.generateToken(userExists)
                }
            }
        } catch (error) {
            throw error;
        }

    }

    public generateToken(user: UserDocument): string {
        try {
            return jwt.sign({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }},
                process.env.JWT_SECRET || "secret", 
                {expiresIn: "10m"});
        } catch (error) {
            throw error;
        }
    }
}

export const authService = new AuthService();