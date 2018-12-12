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
const user_service_1 = require("./../../users/services/user-service");
const post_service_1 = require("./../services/post-service");
class PostController {
    static getAllApprovedPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_service_1.PostService.getAllApprovedPosts();
            res.status(200).send(posts);
        });
    }
    static getAllWaitingPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_service_1.PostService.getAllWaitingPosts();
            res.status(200).send(posts);
        });
    }
    static addPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = req.body;
            const user = yield user_service_1.UserService.getUserByToken(req.headers.authorization);
            model.ownerId = user.id;
            const post = yield post_service_1.PostService.addPost(model);
            res.status(200).send(post);
        });
    }
    static updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_service_1.PostService.updatePost(req.params.id, req.body);
            res.status(200).send();
        });
    }
    static getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send(yield post_service_1.PostService.getPost(req.params.id));
        });
    }
    static getMyPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.UserService.getUserByToken(req.headers.authorization);
            const posts = yield post_service_1.PostService.getMyPosts(user.id);
            res.status(200).send(posts);
        });
    }
    static deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_service_1.PostService.deletePost(req.params.id);
            res.status(200).send();
        });
    }
}
exports.default = PostController;
