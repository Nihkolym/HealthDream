"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/models/db");
const Sequelize = require("sequelize");
exports.Disease = db_1.default.define("disease", {
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
}, {
    timestamps: false,
});
