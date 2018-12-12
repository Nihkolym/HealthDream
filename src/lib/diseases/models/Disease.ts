import db from "../../db/models/db";
import * as Sequelize from "sequelize";
import { IRecommandation } from "../../reccomandations/models/Recommandation";

export interface IDisease {
    id?: number;
    name: string;
    idOfRecommendation: number;
    recommendation?: IRecommandation;
}

export const Disease = db.define<IDisease, IDisease>("disease", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 255],
        },
    },
    idOfRecommendation: {
        type: Sequelize.INTEGER,
    },
},
{
    timestamps: false,
});
