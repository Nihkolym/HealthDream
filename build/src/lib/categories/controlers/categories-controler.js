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
const disease_service_1 = require("./../services/disease-service");
class DiseaseController {
    static getAllDiseases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const diseases = yield disease_service_1.DiseaseService.getAllDiseases();
            res.status(200).send(diseases);
        });
    }
}
exports.default = DiseaseController;
