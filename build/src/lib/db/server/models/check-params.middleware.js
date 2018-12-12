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
const joi = require("joi");
const request_verb_enum_1 = require("../enums/request-verb-enum");
const error_1 = require("../../tools/error");
class CheckParamsMiddleware {
    static getCollection(req) {
        switch (req.method) {
            case request_verb_enum_1.Requests.GET:
                return req.query;
            case request_verb_enum_1.Requests.DELETE:
            case request_verb_enum_1.Requests.POST:
            case request_verb_enum_1.Requests.PUT:
                return req.body;
            default:
                throw new error_1.default(500);
        }
    }
    static validateParamsJoi(schema) {
        return (req, res, next) => {
            const collection = CheckParamsMiddleware.getCollection(req);
            const result = joi.validate(collection, schema);
            if (!result.error) {
                next();
            }
            else {
                throw new error_1.default(400);
            }
        };
    }
    static validateSequelizeEntity(entity) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const collection = CheckParamsMiddleware.getCollection(req);
            const model = entity.build(collection);
            try {
                yield model.validate();
                next();
            }
            catch (error) {
                throw new error_1.default(400);
            }
        });
    }
}
exports.default = CheckParamsMiddleware;
