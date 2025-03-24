import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization"); 

    if (!authHeader) {
        res.status(401).json({ message: "Not Authorized" });
        return;
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as any;
        req.body.loggedUser = decoded.user;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(401).json({ message: "Token Expired" });
            return;
        }
        res.status(401).json({ message: "Not Authorized" });
    }

}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

    const user = req.body.loggedUser;
    if (user.roles.includes("admin")) {
        next();
    }
    else {
        res.status(401).json({ message: "Not Authorized" });
    }
}
