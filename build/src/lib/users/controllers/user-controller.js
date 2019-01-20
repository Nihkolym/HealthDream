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
const disease_service_1 = require("./../../diseases/services/disease-service");
const personal_service_1 = require("./../../personalRecommandation/services/personal.service");
const user_service_1 = require("../services/user-service");
const bcrypt_1 = require("bcrypt");
class UserController {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_service_1.UserService.getAllUsers();
            res.status(200).send(users);
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const user = yield user_service_1.UserService.getUserByToken(token);
            res.status(200).send(user);
        });
    }
    static getMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const user = yield user_service_1.UserService.getUserByToken(token);
            res.status(200).send(user);
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            yield user_service_1.UserService.deleteUser(userId);
            res.status(200).send();
        });
    }
    static changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const user = yield user_service_1.UserService.getUserByToken(token);
            const newPass = req.body.newPass;
            const oldPass = req.body.oldPass;
            if (yield bcrypt_1.compare(oldPass, user.password)) {
                const pass = yield bcrypt_1.hash(newPass, 10);
                yield user_service_1.UserService.changePassword(user.id, pass);
                res.status(200).send();
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield user_service_1.UserService.getUser(userId);
            const model = req.body;
            if (!model.age) {
                model.age = null;
            }
            let oldDiseaseId;
            if ((user.idOfDisease !== +model.idOfDisease || user.gender !== +model.gender || user.age !== +model.age)) {
                if (user.idOfPersonalReccomandation) {
                    oldDiseaseId = user.idOfPersonalReccomandation;
                }
                let disease;
                if (model.idOfDisease) {
                    disease = yield disease_service_1.DiseaseService.getDisease(model.idOfDisease);
                }
                else {
                    model.idOfDisease = null;
                }
                let personalRec;
                if (model.idOfDisease || model.age || model.gender) {
                    if (disease) {
                        personalRec = yield personal_service_1.PersonalService.create(model, disease);
                        model.idOfPersonalReccomandation = personalRec.id;
                    }
                    else {
                        model.idOfPersonalReccomandation = null;
                    }
                }
                else {
                    if (model.idOfPersonalReccomandation) {
                        model.idOfPersonalReccomandation = null;
                    }
                }
            }
            const result = yield user_service_1.UserService.updateUser(model, userId);
            if (oldDiseaseId) {
                yield personal_service_1.PersonalService.remove(user.idOfPersonalReccomandation);
            }
            res.status(200).send({ result });
        });
    }
    static getMyRecommandation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const user = yield user_service_1.UserService.getUserByToken(token);
            res.status(200).send(yield user_service_1.UserService.getMyRecommandation(user.idOfPersonalReccomandation));
        });
    }
    static getUserRecommandation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield user_service_1.UserService.getUser(id);
            res.status(200).send(yield user_service_1.UserService.getMyRecommandation(user.idOfPersonalReccomandation));
        });
    }
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = req.body;
            const user = yield user_service_1.UserService.addUser(model);
            res.status(200).send(user);
        });
    }
}
exports.default = UserController;
