import bodyParser = require("body-parser");
import passport = require("passport");
import * as express from "express";
import userRouter from "../../users/routes/user-router";
import diseaseRouter from "../../diseases/routes/disease-router";
import postRouter from "../../posts/routes/post-router";
import * as core from "express-serve-static-core";
import * as cors from "cors";

export class Server {
    public app: core.Express;
    private router: express.Router;

    constructor() {
        this.app = express();
        this.router = express.Router();

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(passport.initialize());
        this.app.use(cors());

        this.setRoutes();
    }

    private setRoutes() {
        this.app.use("/api/v1", this.router);
        this.router.use("/users", userRouter);
        this.router.use("/posts", postRouter);
        this.router.use("/diseases", diseaseRouter);
    }
}

export default new Server().app;
