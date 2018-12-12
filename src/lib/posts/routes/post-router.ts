import { Router } from "express";
import CheckRoleMiddleware from "../../server/models/check-role.middleware";
import { Role } from "../../server/models/role";
import PostController from "../controllers/post-controller";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/approved", PostController.getAllApprovedPosts);
        this.router.get("/waiting", CheckRoleMiddleware.checkRole(Role.Admin), PostController.getAllWaitingPosts);
        this.router.get("/my", PostController.getMyPosts);
        this.router.get("/:id", PostController.getPost);
        this.router.post("/", PostController.addPost);
        this.router.put("/:id", PostController.updatePost);
        this.router.delete("/:id", PostController.deletePost);
    }
}

const userRouter = new UserRouter();

export default userRouter.router;
