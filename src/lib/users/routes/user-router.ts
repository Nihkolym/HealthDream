import { Router } from "express";
import UserController from "../controllers/user-controller";
import { AuthController } from "../../authentication/controllers/auth-controller";
import CheckRoleMiddleware from "../../server/models/check-role.middleware";
import { Role } from "../../server/models/role";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/",
            CheckRoleMiddleware.checkRole(Role.Admin),
            UserController.getAllUsers,
        );
        this.router.get("/me", UserController.getMe);
        this.router.get("/getUserByToken", UserController.getUser);
        this.router.post("/signup", AuthController.signUp);
        this.router.post("/login", AuthController.signIn);
        this.router.delete("/:id", CheckRoleMiddleware.checkRole(Role.Admin), UserController.deleteUser);
        this.router.put("/:id", UserController.updateUser);
    }
}

const userRouter = new UserRouter();

export default userRouter.router;
