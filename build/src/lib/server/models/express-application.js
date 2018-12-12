"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const passport = require("passport");
const express = require("express");
const user_router_1 = require("../../users/routes/user-router");
const disease_router_1 = require("../../diseases/routes/disease-router");
const post_router_1 = require("../../posts/routes/post-router");
const cors = require("cors");
class Server {
    constructor() {
        this.app = express();
        this.router = express.Router();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(passport.initialize());
        this.app.use(cors());
        this.setRoutes();
    }
    setRoutes() {
        this.app.use("/api/v1", this.router);
        this.router.use("/users", user_router_1.default);
        this.router.use("/posts", post_router_1.default);
        this.router.use("/diseases", disease_router_1.default);
    }
}
exports.Server = Server;
exports.default = new Server().app;
