import db from "../../db/models/db";
import * as Sequelize from "sequelize";

export interface IRecommandation {
    id?: number;
    temperature: number;
    humidity: number;
    pose: string;
    notes: string;
}

export const PersonalReccomandation
        = db.define<IRecommandation, IRecommandation>("recommandation", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    temperature: {
        type: Sequelize.INTEGER,
    },
    humidity: {
        type: Sequelize.INTEGER,
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
