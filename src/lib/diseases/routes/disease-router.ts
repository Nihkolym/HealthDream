import { Router } from "express";
import DiseaseController from "../controlers/disease-controler";

class DiseaseRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/",
            DiseaseController.getAllDiseases,
        );
    }
}

const diseaseRouter = new DiseaseRouter();

export default diseaseRouter.router;
