import db from "../../db/models/db";
import * as Sequelize from "sequelize";
import { IDisease } from "../../diseases/models/Disease";
import { IPersonalRecommandation } from "../../personalRecommandation/models/PersonalRecommandation";

export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: number;
    idOfDisease?: number;
    idOfPersonalReccomandation?: number;
    dateOfBirth?: string;
    gender?: number;
    disease?: IDisease;
    personalReccomandation?: IPersonalRecommandation;
}

export const User = db.define<IUser, object>("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            len: [3, 255],
        },
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    dateOfBirth: {
        type: Sequelize.STRING,
        validate: {
            len: [0, 255],
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [0, 255],
        },
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idOfDisease: {
        type: Sequelize.INTEGER,
    },
    idOfPersonalReccomandation: {
        type: Sequelize.INTEGER,
    },
    gender: {
        type: Sequelize.INTEGER,
    },
},
{
    timestamps: false,
});
