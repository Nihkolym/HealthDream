import { Reccomandation } from "./../../reccomandations/models/Recommandation";
import { IDisease, Disease } from "./../models/Disease";

export class DiseaseService {
    public static async getAllDiseases(): Promise<IDisease[]> {
        return await Disease.findAll();
    }

    public static async getDisease(id): Promise<IDisease> {
        return await Disease.findByPk(+id, {
            include: [{
                model: Reccomandation,
            }],
        });
    }
}
