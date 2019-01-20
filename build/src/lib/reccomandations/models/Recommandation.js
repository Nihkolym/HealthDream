"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/models/db");
const Sequelize = require("sequelize");
exports.Reccomandation = db_1.default.define("recommandation", {
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
}, {
    timestamps: false,
});
