import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../../users/models/user";

export class AuthController {
    public static async signUp(req: Request, res: Response, next: NextFunction) {
        return passport.authenticate("signup", (err: Error, user: IUser) => {
            if (err) {
                res.sendStatus(400);
            } else {
                res.status(200).send(user);
            }
        })(req, res, next);
    }

    public static async signIn(req: Request, res: Response, next: NextFunction) {
        return passport.authenticate("login", async (err: Error, user: IUser) => {
            try {
                if (err || !user) {
                    return next(err);
                }
                req.login(user, { session: false }, async (error) => {
                    if (error) {
                        return next(error);
                    }

                    const body = { email: user.email };

                    const token = jwt.sign(body, process.env.SECRET!, {
                        expiresIn: "30 days",
                    });

                    return res.json({ token, role: user.role });
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    }
}
