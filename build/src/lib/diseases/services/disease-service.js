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
const Recommandation_1 = require("./../../reccomandations/models/Recommandation");
const Disease_1 = require("./../models/Disease");
class DiseaseService {
    static getAllDiseases() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Disease_1.Disease.findAll();
        });
    }
    static getDisease(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Disease_1.Disease.findByPk(+id, {
                include: [{
                        model: Recommandation_1.Reccomandation,
                    }],
            });
        });
    }
}
exports.DiseaseService = DiseaseService;
