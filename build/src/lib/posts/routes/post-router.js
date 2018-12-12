"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_role_middleware_1 = require("../../server/models/check-role.middleware");
const role_1 = require("../../server/models/role");
const post_controller_1 = require("../controllers/post-controller");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.setRoutes();
    }
    setRoutes() {
        this.router.get("/approved", post_controller_1.default.getAllApprovedPosts);
        this.router.get("/waiting", check_role_middleware_1.default.checkRole(role_1.Role.Admin), post_controller_1.default.getAllWaitingPosts);
        this.router.get("/my", post_controller_1.default.getMyPosts);
        this.router.get("/:id", post_controller_1.default.getPost);
        this.router.post("/", post_controller_1.default.addPost);
        this.router.put("/:id", post_controller_1.default.updatePost);
        this.router.delete("/:id", post_controller_1.default.deletePost);
    }
}
const userRouter = new UserRouter();
exports.default = userRouter.router;
