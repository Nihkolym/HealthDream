"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const express_1 = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user_router_1 = require("./lib/users/routes/user-router");
class Server {
    constructor() {
        try {
            this.app = express();
            this.router = express_1.Router();
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(bodyParser.json());
            this.app.use(cors());
            this.setRoutes();
        }
        catch (error) {
            global.console.log("Error");
        }
    }
    setRoutes() {
        this.app.use("/api/v1", this.router);
        this.router.use("/users", user_router_1.default);
    }
}
exports.Server = Server;
const server = new Server();
http.createServer(server.app).listen("8080");
