import db from "../../db/models/db";
import * as Sequelize from "sequelize";

export interface IUser {
    firstName: string;
    lastName: string;
}

export const User = db.define<IUser, object>("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: Sequelize.STRING,
        validate: {
            len: [3, 255],
        },
    },
    lastName: {
        type: Sequelize.INTEGER,
        validate: {
            len: [3, 255],
        },
    },
},
{
    timestamps: false,
});
