import { Role } from "./role";
import { Response, Request, NextFunction } from "express";
import { IUser } from "../../users/models/user";
import {UserService} from "../../users/services/user-service";

export default class CheckRoleMiddleware {
    public static checkRole(...roles: Role[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const token: string = req.headers.authorization!;
            const user: IUser = await UserService.getUserByToken(token);

            const isValid = roles.some((role) => user.role === role);

            if (isValid) {
                next();
            } else {
                throw new Error("490");
            }
        };
    }
}
