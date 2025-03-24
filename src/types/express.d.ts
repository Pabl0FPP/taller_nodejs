import { User } from "../models/user.model"; // Ajusta la ruta según tu proyecto

declare global {
    namespace Express {
        interface Request {
            user?: User; // Ajusta el tipo según tu modelo de usuario
        }
    }
}