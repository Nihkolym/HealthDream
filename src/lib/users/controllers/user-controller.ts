import { DiseaseService } from './../../diseases/services/disease-service';
import { PersonalService } from './../../personalRecommandation/services/personal.service';
import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import { IUser } from "../models/User";
import { hash, compare } from 'bcrypt';


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

    public static async changePassword(req: Request, res: Response) {
        const token = req.headers.authorization;
        const user: IUser = await UserService.getUserByToken(token);

        const newPass = req.body.newPass;
        const oldPass = req.body.oldPass;

        if (await compare(oldPass, user.password)) {
            const pass = await hash(newPass, 10);
            await UserService.changePassword(user.id, pass);

            res.status(200).send();
        } else {
            res.sendStatus(400);
        }
    }

    public static async updateUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const user = await UserService.getUser(userId);

        const model: IUser = req.body;

        if (!model.age) {
            model.age = null;
        }

        let oldDiseaseId;

        if (
                (user.idOfDisease !== +model.idOfDisease || user.gender !== +model.gender || user.age !== +model.age)
            ) {
            if (user.idOfPersonalReccomandation) {
                oldDiseaseId = user.idOfPersonalReccomandation;
            }

            let disease;
            if (model.idOfDisease) {
                disease = await DiseaseService.getDisease(model.idOfDisease);
            } else {
                model.idOfDisease = null;
            }

            let personalRec;

            if (model.idOfDisease || model.age || model.gender) {
                if (disease) {
                    personalRec = await PersonalService.create(model, disease);
                    model.idOfPersonalReccomandation = personalRec.id;
                } else {
                    model.idOfPersonalReccomandation = null;
                }
            } else {
                if (model.idOfPersonalReccomandation) {
                    model.idOfPersonalReccomandation = null;
                }
            }
        }

        const result = await UserService.updateUser(model, userId);

        if (oldDiseaseId) {
            await PersonalService.remove(user.idOfPersonalReccomandation);
        }

        res.status(200).send({result});
    }

    public static async getMyRecommandation(req: Request, res: Response) {
        const token = req.headers.authorization;

        const user: IUser = await UserService.getUserByToken(token);

        res.status(200).send(await UserService.getMyRecommandation(user.idOfPersonalReccomandation));
    }

    public static async getUserRecommandation(req: Request, res: Response) {
        const id = req.params.id;

        const user: IUser = await UserService.getUser(id);

        res.status(200).send(await UserService.getMyRecommandation(user.idOfPersonalReccomandation));
    }

    public static async addUser(req: Request, res: Response): Promise<void> {
        const model = req.body;

        const user = await UserService.addUser(model);

        res.status(200).send(user);
    }
}
