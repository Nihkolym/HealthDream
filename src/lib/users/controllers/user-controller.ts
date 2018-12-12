import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import { IUser } from "../models/User";

export default class UserController {
    public static async getAllUsers(req: Request, res: Response): Promise<void> {
        const users: IUser[] = await UserService.getAllUsers();

        res.status(200).send(users);
    }

    public static async getUser(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization;

        const user: IUser = await UserService.getUserByToken(token);

        res.status(200).send(user);
    }

    public static async getMe(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization;

        const user: IUser = await UserService.getUserByToken(token);

        res.status(200).send(user);
    }

    public static async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;

        await UserService.deleteUser(userId);

        res.status(200).send();
    }

    public static async updateUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const model = req.body.user;

        await UserService.updateUser(model, userId);

        res.status(200).send();
    }

    public static async addUser(req: Request, res: Response): Promise<void> {
        const model = req.body;

        const user = await UserService.addUser(model);

        res.status(200).send(user);
    }
}
