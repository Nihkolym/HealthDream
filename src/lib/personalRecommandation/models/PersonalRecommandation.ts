import db from "../../db/models/db";
import * as Sequelize from "sequelize";

export interface IPersonalRecommandation {
    id?: number;
    temperature: number;
    humidity: number;
    pose: string;
    notes: string;
}

export const PersonalReccomandation
        = db.define<IPersonalRecommandation, IPersonalRecommandation>("personalRecommandation", {
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
