import { IDisease, Disease } from "./../models/Disease";

export class DiseaseService {
    public static async getAllDiseases(): Promise<IDisease[]> {
        return await Disease.findAll();
    }
}
