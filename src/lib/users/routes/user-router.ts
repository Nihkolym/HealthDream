import { Router } from "express";
import UserController from "../controllers/user-controller";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/", UserController.getAllUsers);
        this.router.get("/:id", UserController.getUser);
        this.router.post("/", UserController.addUser);
        this.router.delete("/:id", UserController.deleteUser);
        this.router.put("/:id", UserController.updateUser);
    }
}

const userRouter = new UserRouter();

export default userRouter.router;
