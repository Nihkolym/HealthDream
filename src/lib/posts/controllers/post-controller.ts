import { UserService } from "./../../users/services/user-service";
import { PostService } from "./../services/post-service";
import { Post, IPost } from "./../models/Post";
import { Request, Response } from "express";

export default class PostController {
    public static async getAllApprovedPosts(req: Request, res: Response): Promise<void> {
        const posts: IPost[] = await PostService.getAllApprovedPosts();

        res.status(200).send(posts);
    }

    public static async getAllWaitingPosts(req: Request, res: Response): Promise<void> {
        const posts: IPost[] = await PostService.getAllWaitingPosts();

        res.status(200).send(posts);
    }

    public static async addPost(req: Request, res: Response): Promise<void> {
        const model: IPost = req.body;

        const user = await UserService.getUserByToken(req.headers.authorization);

        model.ownerId = user.id;

        const post: IPost = await PostService.addPost(model);

        res.status(200).send(post);
    }

    public static async updatePost(req: Request, res: Response): Promise<void> {
        await PostService.updatePost(req.params.id, req.body);

        res.status(200).send();
    }

    public static async getPost(req: Request, res: Response): Promise<void> {
        res.status(200).send(await PostService.getPost(req.params.id));
    }

    public static async getMyPosts(req: Request, res: Response): Promise<void> {
        const user = await UserService.getUserByToken(req.headers.authorization);

        const posts: IPost[] = await PostService.getMyPosts(user.id);

        res.status(200).send(posts);
    }

    public static async deletePost(req: Request, res: Response): Promise<void> {
        await PostService.deletePost(req.params.id);

        res.status(200).send();
    }
}
