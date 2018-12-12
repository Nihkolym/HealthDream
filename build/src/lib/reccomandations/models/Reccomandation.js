"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/models/db");
const Sequelize = require("sequelize");
exports.PersonalReccomandation = db_1.default.define("reccomandation", {
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
}, {
    timestamps: false,
});
