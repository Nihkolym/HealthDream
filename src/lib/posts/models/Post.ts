import { IUser, User } from "./../../users/models/User";
import db from "../../db/models/db";
import * as Sequelize from "sequelize";

export interface IPost {
    id?: number;
    title: string;
    status?: number;
    description: string;
    ownerId?: number;
    user?: IUser;
}

export const Post = db.define<IPost, IPost>("post", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
},
{
    timestamps: false,
});

Post.belongsTo(User, {
    foreignKey: "ownerId",
});

User.hasMany(Post);

