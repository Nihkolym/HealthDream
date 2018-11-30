import { IUser, User } from "../models/User";

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

    public static async updateUser(model: IUser, userId: number): Promise<void> {
        await User.update(model,
            {
                where: {
                    id: userId,
                },
            },
        );
    }
}
