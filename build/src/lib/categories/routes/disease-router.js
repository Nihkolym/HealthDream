"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const disease_controler_1 = require("../controlers/disease-controler");
class DiseaseRouter {
    constructor() {
        this.router = express_1.Router();
        this.setRoutes();
    }
    setRoutes() {
        this.router.get("/", disease_controler_1.default.getAllDiseases);
    }
}
const diseaseRouter = new DiseaseRouter();
exports.default = diseaseRouter.router;
