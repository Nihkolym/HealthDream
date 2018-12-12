"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan_1 = require("../../tools/morgan");
const logger_service_1 = require("../../tools/logger-service");
const express_1 = require("express");
const task_router_1 = require("../../tasks/routes/task-router");
const category_manager_router_1 = require("../../category-manager/routes/category-manager-router");
const user_router_1 = require("../../user/routes/user-router");
const deal_router_1 = require("../../deals/routes/deal-router");
const category_router_1 = require("../../categories/routes/category-router");
const error_1 = require("../../tools/error");
const cors_1 = require("cors");
class Server {
    constructor() {
        this.app = express_1.default();
        this.router = express_1.default.Router();
        try {
            this.app.use(morgan_1.morganSetUp());
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(bodyParser.json());
            this.app.use(passport.initialize());
            this.app.use(cors_1.default());
            this.setRoutes();
            this.app.use((error, req, res, next) => {
                switch (error.Code) {
                    case 400: {
                        res.sendStatus(400);
                        break;
                    }
                    case 404: {
                        res.sendStatus(404);
                        break;
                    }
                    case 500: {
                        res.sendStatus(500);
                        break;
                    }
                }
            });
        }
        catch (error) {
            logger_service_1.log.error(error);
        }
    }
    setRoutes() {
        this.app.use("/api/v1", this.router);
        this.router.use("/tasks", task_router_1.default);
        this.router.use("/categories", category_router_1.default);
        this.router.use("/manager", category_manager_router_1.default);
        this.router.use("/users", user_router_1.default);
        this.router.use("/deals", deal_router_1.default);
        this.router.get("*", (req, res, next) => {
            throw new error_1.default(404);
        });
    }
}
exports.Server = Server;
exports.default = new Server().app;
