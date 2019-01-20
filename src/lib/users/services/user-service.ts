import { PersonalReccomandation } from "./../../personalRecommandation/models/PersonalRecommandation";
import { IUser, User } from "../models/User";
import * as jwt from "jsonwebtoken";
import { IPersonalRecommandation } from "../../personalRecommandation/models/PersonalRecommandation";

export class UserService {
    public static async getAllUsers(): Promise<IUser[]> {
        return await User.findAll();
    }

    public static async getUser(userId: number): Promise<IUser> {
        const user = await User.findByPk(userId);

        if (user) {
            return user;
        } else {
            throw Error("500");
        }
    }

    public static async getMyRecommandation(id): Promise<IPersonalRecommandation> {
        return await PersonalReccomandation.findByPk(id);
    }

    public static async addUser(model: IUser): Promise<IUser> {
        const user = await User.create(model);

        if (user) {
            return user;
        } else {
            throw new Error("500");
        }
    }

    public static async deleteUser(userId: number): Promise<void> {
        const res = await User.destroy(
            {
                where: {
                    id: userId,
                },
            },
        );

        if (!res) {
            throw new Error("500");
        }
    }

    public static async updateUser(model: IUser, userId: number): Promise<number> {
        return (await User.update(model,
            {
                where: {
                    id: userId,
                },
            },
        ))[0];
    }

    public static async changePassword(userId: number, newPass: string) {
        await User.update({password: newPass}, {
            where: {
                id: userId,
            },
        });
    }

    public static async getUserByEmail(email: any): Promise<IUser> {
        const user: IUser = await User.findOne({
            where: {
                email,
            },
        });

        if (user) {
            return user;
        } else {
            throw new Error("400");
        }
    }

    public static async getUserByToken(token: string): Promise<IUser> {
        const body: any = jwt.decode(token);

        return await this.getUserByEmail(body.email);
    }
}
