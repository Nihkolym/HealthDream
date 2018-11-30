import * as http from "http";
import * as express from "express";
import { Application, Router } from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import userRouter from "./lib/users/routes/user-router";

export class Server {
    public app: Application;

    private router: Router;

    constructor() {
        try {
            this.app = express();
            this.router = Router();

            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(bodyParser.json());

            this.app.use(cors());

            this.setRoutes();
        } catch (error) {
            global.console.log("Error");
        }
    }

    private setRoutes() {
        this.app.use("/api/v1", this.router);
        this.router.use("/users", userRouter);
    }
}

const server = new Server();

http.createServer(server.app).listen("8080");
