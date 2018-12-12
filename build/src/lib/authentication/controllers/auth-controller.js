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
const passport = require("passport");
const jwt = require("jsonwebtoken");
class AuthController {
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return passport.authenticate("signup", (err, user) => {
                if (err) {
                    res.sendStatus(400);
                }
                else {
                    res.status(200).send(user);
                }
            })(req, res, next);
        });
    }
    static signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return passport.authenticate("login", (err, user) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err || !user) {
                        return next(err);
                    }
                    req.login(user, { session: false }, (error) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            return next(error);
                        }
                        const body = { email: user.email };
                        const token = jwt.sign(body, process.env.SECRET, {
                            expiresIn: "30 days",
                        });
                        return res.json({ token, role: user.role });
                    }));
                }
                catch (error) {
                    return next(error);
                }
            }))(req, res, next);
        });
    }
}
exports.AuthController = AuthController;
