import { Disease } from "./../../diseases/models/Disease";
import db from "../../db/models/db";
import * as Sequelize from "sequelize";

export interface IRecommandation {
    id?: number;
    pose: string;
    notes: string;
}

export const Reccomandation
        = db.define<IRecommandation, IRecommandation>("recommandation", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pose: {
        type: Sequelize.STRING,
    },
    notes: {
        type: Sequelize.STRING,
    },
},
{
    timestamps: false,
});
