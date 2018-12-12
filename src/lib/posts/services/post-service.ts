import { Post, IPost } from "./../models/Post";
import { User } from "../../users/models/User";

export class PostService {
    public static async getAllApprovedPosts(): Promise<IPost[]> {
        return await Post.findAll({
            where: {
                status: 2,
            },
            include: [
                {
                    model: User,
                },
            ],
            group: "id",
        });
    }

    public static async getAllWaitingPosts(): Promise<IPost[]> {
        return await Post.findAll({
            where: {
                status: 1,
            },
            include: [
                {
                    model: User,
                },
            ],
            group: "id",
        });
    }

    public static async getMyPosts(userId): Promise<IPost[]> {
        return await Post.findAll({
            where: {
                ownerId: userId,
            },
        });
    }

    public static async addPost(model: IPost): Promise<IPost> {
        return await Post.create(model);
    }

    public static async updatePost(id: number, model: IPost): Promise<void> {
        await Post.update(model, {
            where: {
                id,
            },
        });
    }

    public static async deletePost(id): Promise<void> {
        await Post.destroy({
            where: {
                id,
            },
        });
    }

    public static async getPost(id): Promise<IPost> {
        return await Post.find({
            where: {
                id,
            },
        });
    }
}
