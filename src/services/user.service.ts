import { UserInput, UserInputUpdate } from "../interfaces";
import { UserDocument, UserModel, RoleModel } from "../models";
import bcrypt from "bcrypt";

class UserService{

    public async createUser(userInput: UserInput): Promise<UserDocument>{
        try {
            const userExists: UserDocument | null = await this.findByEmail(userInput.email);
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

    public  async findByEmail(email: string): Promise<UserDocument | null>{
        try {
            const user = await UserModel.findOne({email}).populate('roles');
            return user;
        } catch (error) {
            throw error;
        }
    }

    public  async findById(id: string): Promise<UserDocument | null>{
        try {
            const user = await UserModel.findById(id).populate('roles');
            return user;
        } catch (error) {
            throw error;
        }
    }

    public  async getUsers(): Promise<UserDocument[]>{
        try {
            const users: UserDocument[] = await UserModel.find().populate('roles');
            return users;
        } catch (error) {
            throw error;
        }
    }    


    public async updateUser(id: string, userInput: UserInputUpdate): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findOneAndUpdate(
                { _id: id },
                userInput,
                { returnOriginal: false }
            ).populate('roles');
            if (!user) {
                throw new Error('User not found');
            }
            user.password = "";
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async deleteUser(id: string): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findByIdAndDelete(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}

export const userService = new UserService();