"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersonalRecommandation_1 = require("./../models/PersonalRecommandation");
class PersonalService {
    static create(user, disease) {
        return __awaiter(this, void 0, void 0, function* () {
            const personal = {
                temperature: null,
                humidity: null,
                notes: disease ? disease.recommandation.notes : null,
                pose: disease ? disease.recommandation.pose : null,
            };
            if (+user.age) {
                if (+user.age <= 14) {
                    personal.temperature = 22;
                    personal.humidity = 55;
                }
                else {
                    personal.humidity = 50;
                }
            }
            if (+user.gender == 1 && (+user.age) > 14) {
                personal.temperature = 18;
                personal.humidity = 50;
            }
            else if (+user.gender === 2) {
                personal.temperature = 21;
                personal.humidity = 50;
            }
            return yield PersonalRecommandation_1.PersonalReccomandation.create(personal);
        });
    }
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PersonalRecommandation_1.PersonalReccomandation.destroy({
                where: {
                    id,
                },
            });
        });
    }
}
exports.PersonalService = PersonalService;
