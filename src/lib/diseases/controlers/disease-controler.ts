import { DiseaseService } from "./../services/disease-service";
import { IDisease } from "./../models/Disease";
import { Request, Response } from "express";

export default class DiseaseController {
    public static async getAllDiseases(req: Request, res: Response): Promise<void> {
        const diseases: IDisease[] = await DiseaseService.getAllDiseases();

        res.status(200).send(diseases);
    }
}
