"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/models/db");
const Sequelize = require("sequelize");
exports.User = db_1.default.define("user", {
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
}, {
    timestamps: false,
});
