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
const Post_1 = require("./../models/Post");
const User_1 = require("../../users/models/User");
class PostService {
    static getAllApprovedPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Post_1.Post.findAll({
                where: {
                    status: 2,
                },
                include: [
                    {
                        model: User_1.User,
                    },
                ],
                group: "id",
            });
        });
    }
    static getAllWaitingPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Post_1.Post.findAll({
                where: {
                    status: 1,
                },
                include: [
                    {
                        model: User_1.User,
                    },
                ],
                group: "id",
            });
        });
    }
    static getMyPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Post_1.Post.findAll({
                where: {
                    ownerId: userId,
                },
            });
        });
    }
    static addPost(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Post_1.Post.create(model);
        });
    }
    static updatePost(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Post_1.Post.update(model, {
                where: {
                    id,
                },
            });
        });
    }
    static deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Post_1.Post.destroy({
                where: {
                    id,
                },
            });
        });
    }
    static getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Post_1.Post.find({
                where: {
                    id,
                },
            });
        });
    }
}
exports.PostService = PostService;
