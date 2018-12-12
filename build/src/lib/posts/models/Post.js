"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./../../users/models/User");
const db_1 = require("../../db/models/db");
const Sequelize = require("sequelize");
exports.Post = db_1.default.define("post", {
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
}, {
    timestamps: false,
});
exports.Post.belongsTo(User_1.User, {
    foreignKey: "ownerId",
});
User_1.User.hasMany(exports.Post);
