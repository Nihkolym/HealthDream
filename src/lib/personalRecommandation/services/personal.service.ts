import { IPersonalRecommandation, PersonalReccomandation } from "./../models/PersonalRecommandation";
import { IRecommandation } from "./../../reccomandations/models/Recommandation";
import { IUser } from "./../../users/models/User";
import { IDisease } from "../../diseases/models/Disease";

export class PersonalService {
    public static async create(user: IUser, disease: IDisease) {

        const personal: IPersonalRecommandation = {
            temperature: null,
            humidity: null,
            notes: disease ? disease.recommandation.notes : null,
            pose: disease ? disease.recommandation.pose : null,
        };

        if (+user.age) {
            if (+user.age <= 14) {
                personal.temperature = 22;
                personal.humidity = 55;
            } else {
                personal.humidity = 50;
            }
        }

        if (+user.gender == 1 && (+user.age) > 14) {
            personal.temperature = 18;
            personal.humidity = 50;
        } else if (+user.gender === 2) {
            personal.temperature = 21;
            personal.humidity = 50;
        }

        return await PersonalReccomandation.create(personal);
    }

    public static async remove(id) {
        await PersonalReccomandation.destroy({
            where: {
                id,
            },
        });
    }
}
